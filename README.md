# Lexia

**Buscador semántico de jurisprudencia argentina potenciado con inteligencia artificial.**

## ¿Qué es?

Lexia permite consultar dictámenes y jurisprudencia del ámbito jurídico argentino usando lenguaje natural. En lugar de recordar carátulas, números de expediente o términos técnicos exactos, alcanza con describir el caso o la situación con las propias palabras.

El motor encuentra resultados por similitud conceptual, no por coincidencia de palabras clave. Eso significa que una búsqueda como *"responsabilidad del estado por un accidente en la vía pública"* devuelve fallos relevantes aunque ninguno use exactamente esa frase.

## Fuentes

Los documentos provienen de fuentes oficiales argentinas:

- **SAIJ** — Sistema Argentino de Información Jurídica
- **MPF** — Ministerio Público Fiscal de la Nación
- **PTN** — Procuración del Tesoro de la Nación

## Cómo funciona

Cada documento es convertido a un vector numérico (embedding) usando el modelo `text-embedding-3-large` de OpenAI, que captura el significado semántico del texto. Esos vectores se almacenan en PostgreSQL con la extensión pgvector y se indexan con HNSW para búsqueda eficiente por similitud coseno.

Cuando el usuario hace una consulta, se genera el embedding de esa consulta y se compara contra todos los documentos. Solo se devuelven resultados con al menos 70% de similitud semántica.

La interfaz está construida con Next.js 15 y Tailwind CSS v4.

## Licencia

MIT
