import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import OpenAI from "openai";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const EMBED_MODEL = "text-embedding-3-large";
const EMBED_DIM = 1536;
const RERANK_MODEL = process.env.RERANK_MODEL ?? "gpt-4o-mini";

export interface SearchResult {
  uuid: string;
  titulo: string;
  tribunal: string;
  jurisdiccion: string;
  fecha: string | null;
  texto_preview: string;
  saij_url: string | null;
  similitud: number;
  razon?: string;
  numero_sumario: string | null;
  numero_interno: string | null;
  descriptores: string | null;
}

interface RerankItem {
  index: number;
  relevancia: number;
  razon: string;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json(
      { error: "Parámetro q requerido" },
      { status: 400 },
    );
  }

  // 1. Query expansion: corrige typos, enriquece con terminología jurídica
  let expandedQuery = q;
  try {
    const expandResp = await openai.chat.completions.create({
      model: RERANK_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente jurídico experto en derecho laboral argentino. Tu tarea es transformar la consulta del usuario en una query semántica optimizada para buscar jurisprudencia. Seguí estos pasos: 1) Identificá la pretensión jurídica central (despido, accidente, indemnización, etc.). 2) Extraé los sujetos relevantes (trabajador, empleador, Estado, etc.). 3) Descartá todo lenguaje coloquial, intenciones del usuario y contexto irrelevante para la búsqueda. 4) Expandí con terminología jurídica formal argentina: nombres de institutos legales, artículos de LCT si aplica, conceptos procesales. Devolvé ÚNICAMENTE la query transformada en una o dos oraciones densas semánticamente, sin explicaciones.",
        },
        { role: "user", content: q },
      ],
    });
    expandedQuery = expandResp.choices[0].message.content?.trim() ?? q;
  } catch {
    // Si falla la expansión, continuar con la query original
  }

  // 2. Embed la query expandida
  const embedResp = await openai.embeddings.create({
    model: EMBED_MODEL,
    input: [expandedQuery],
    dimensions: EMBED_DIM,
  });
  const qvec = JSON.stringify(embedResp.data[0].embedding);

  // 3. Búsqueda híbrida: similitud vectorial >= 0.40 OR full-text sobre la query expandida
  const { rows } = await pool.query<SearchResult>(
    `SELECT
       uuid,
       titulo,
       tipo_tribunal AS tribunal,
       jurisdiccion,
       fecha::text,
       texto AS texto_preview,
       saij_url,
       numero_sumario,
       numero_interno,
       descriptores,
       ROUND((1 - (embedding <=> $1::vector))::numeric, 3) AS similitud
     FROM jurisprudencia
     WHERE embedding IS NOT NULL
       AND (
         (1 - (embedding <=> $1::vector)) >= 0.40
         OR to_tsvector('spanish', COALESCE(texto, '') || ' ' || COALESCE(titulo, ''))
            @@ websearch_to_tsquery('spanish', $2)
       )
     ORDER BY embedding <=> $1::vector
     LIMIT 30`,
    [qvec, expandedQuery],
  );

  if (rows.length === 0) {
    return NextResponse.json({ results: [], query: q, expandedQuery });
  }

  // 4. Reranking con LLM: ve el sumario completo y filtra/ordena por relevancia real
  const docsText = rows
    .map(
      (r, i) =>
        `[${i}] Título: ${r.titulo}\nTribunal: ${r.tribunal} (${r.jurisdiccion})\nHolding: ${r.texto_preview}`,
    )
    .join("\n\n---\n\n");

  let finalResults: SearchResult[] = rows;

  try {
    const rerankResp = await openai.chat.completions.create({
      model: RERANK_MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'Eres un asistente jurídico experto en derecho argentino. Evalúa cuáles de los siguientes documentos son genuinamente relevantes para la consulta del usuario. Devuelve únicamente JSON con la clave "resultados", un array de objetos {index: number, relevancia: number (0 a 1), razon: string}. Solo incluye los documentos que realmente aplican. Máximo 10. La razón debe ser en español y explicar brevemente por qué aplica o qué aspecto es relevante.',
        },
        {
          role: "user",
          content: `Consulta: "${q}"\n\nDocumentos candidatos:\n${docsText}`,
        },
      ],
    });

    const parsed = JSON.parse(rerankResp.choices[0].message.content ?? "{}");
    const reranked: RerankItem[] = parsed.resultados ?? [];

    if (reranked.length > 0) {
      finalResults = reranked
        .sort((a, b) => b.relevancia - a.relevancia)
        .map((item) => ({
          ...rows[item.index],
          similitud: Math.round(item.relevancia * 1000) / 1000,
          razon: item.razon,
        }));
    }
  } catch {
    // Si el reranking falla, devolver candidatos vectoriales sin filtrar
  }

  return NextResponse.json({ results: finalResults, query: q, expandedQuery });
}
