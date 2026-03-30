import { useState } from "react";
import type { SearchResult } from "@/app/api/search/route";
import { ResultDetail } from "@/components/result-detail";
import { tribunalLabel, tribunalColor } from "@/lib/tribunales";

function formatDate(fecha: string | null) {
  if (!fecha) return null;
  const parts = fecha.split("-");
  if (parts.length !== 3) return fecha;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function ResultCard({
  result,
  index,
}: {
  result: SearchResult;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const tribColor = tribunalColor(result.tribunal);
  const tribLabel = tribunalLabel(result.tribunal);
  const sim = Math.round(result.similitud * 100);

  // Relevance badge: subtle below 60, warm at 70+, vivid at 85+
  const simBadge =
    sim >= 85
      ? "bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/30 font-bold"
      : sim >= 70
        ? "bg-amber-500/12 text-amber-600 ring-1 ring-amber-500/25 font-semibold"
        : "text-primary/60 font-medium";

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
        <div className="relative">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground/60 shrink-0">
                {String(index).padStart(2, "0")}
              </span>
              {result.tribunal && (
                <span className="relative group/tip">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${tribColor}`}
                  >
                    {result.tribunal}
                  </span>
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-2.5 py-1.5 text-[11px] text-background opacity-0 shadow-lg transition-opacity duration-200 group-hover/tip:opacity-100">
                    {tribLabel}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </span>
                </span>
              )}
              {result.jurisdiccion && (
                <span className="text-xs font-medium text-muted-foreground">
                  {result.jurisdiccion}
                </span>
              )}
              {result.fecha && (
                <span className="text-xs text-muted-foreground/70">
                  {formatDate(result.fecha)}
                </span>
              )}
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] tabular-nums transition-all ${simBadge}`}
            >
              {sim}% relevante
            </span>
          </div>

          <h3 className="mb-3 text-sm font-semibold leading-snug text-foreground line-clamp-2">
            {result.titulo || "(Sin titulo)"}
          </h3>

          {result.texto_preview && (
            <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
              {result.texto_preview}
            </p>
          )}

          {result.razon && (
            <p className="mt-3 text-xs leading-relaxed text-emerald-600/80 dark:text-emerald-400/80 italic">
              {result.razon}
            </p>
          )}

          <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
          <div className="mt-3 flex items-center justify-between gap-2">
            {result.saij_url ? (
              <a
                href={result.saij_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline transition-colors"
              >
                Ver en SAIJ &rarr;
              </a>
            ) : (
              <span className="text-[11px] text-muted-foreground/40">
                Sin enlace
              </span>
            )}
            <span className="text-[10px] text-muted-foreground/40 font-mono">
              {result.numero_sumario
                ? `N° ${result.numero_sumario}`
                : `ID: ${result.uuid.slice(0, 8)}…`}
            </span>
          </div>
        </div>
      </div>

      {open && <ResultDetail result={result} onClose={() => setOpen(false)} />}
    </>
  );
}
