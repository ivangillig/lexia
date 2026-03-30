"use client";
import { useEffect } from "react";
import {
  X,
  ExternalLink,
  Scale,
  Hash,
  Building2,
  CalendarDays,
  FileText,
  Tags,
} from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";
import { tribunalLabel } from "@/lib/tribunales";

function formatDate(fecha: string | null) {
  if (!fecha) return null;
  const parts = fecha.split("-");
  if (parts.length !== 3) return fecha;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function parseDescriptores(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as string[];
  } catch {}
  return [];
}

interface Props {
  result: SearchResult;
  onClose: () => void;
}

export function ResultDetail({ result, onClose }: Props) {
  const descriptores = parseDescriptores(result.descriptores);
  const fullLabel = tribunalLabel(result.tribunal);

  // Cerrar con Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    // Bloquear scroll del body
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-background shadow-2xl border-l border-border animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Sumario de jurisprudencia
            </p>
            <h2 className="text-base font-semibold leading-snug text-foreground line-clamp-3">
              {result.titulo || "(Sin título)"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetaItem Icon={Scale} label="Tribunal" value={fullLabel} wide />
            <MetaItem
              Icon={Building2}
              label="Jurisdicción"
              value={result.jurisdiccion || "—"}
            />
            <MetaItem
              Icon={CalendarDays}
              label="Fecha"
              value={formatDate(result.fecha) ?? "—"}
            />
            {result.numero_sumario && (
              <MetaItem
                Icon={Hash}
                label="N° sumario"
                value={result.numero_sumario}
              />
            )}
            {result.numero_interno && (
              <MetaItem
                Icon={FileText}
                label="N° interno"
                value={result.numero_interno}
              />
            )}
          </div>

          {/* Texto completo */}
          {result.texto_preview && (
            <section>
              <SectionTitle>Holding</SectionTitle>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {result.texto_preview}
              </p>
            </section>
          )}

          {/* Razón de relevancia */}
          {result.razon && (
            <section>
              <SectionTitle>Por qué es relevante</SectionTitle>
              <p className="text-sm leading-relaxed text-emerald-600/90 dark:text-emerald-400/80 italic">
                {result.razon}
              </p>
            </section>
          )}

          {/* Descriptores */}
          {descriptores.length > 0 && (
            <section>
              <SectionTitle Icon={Tags}>Descriptores temáticos</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {descriptores.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-primary/8 px-2.5 py-1 text-[11px] text-primary"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* UUID técnico */}
          <section>
            <SectionTitle>Identificador SAIJ</SectionTitle>
            <p className="font-mono text-[11px] text-muted-foreground/60 break-all">
              {result.uuid}
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            Similitud:{" "}
            <span className="font-semibold text-foreground">
              {Math.round(result.similitud * 100)}%
            </span>
          </span>
          {result.saij_url ? (
            <a
              href={result.saij_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ExternalLink size={13} />
              Ver en SAIJ
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}

function SectionTitle({
  children,
  Icon,
}: {
  children: React.ReactNode;
  Icon?: React.ElementType;
}) {
  return (
    <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
      {Icon && <Icon size={11} />}
      {children}
    </p>
  );
}

function MetaItem({
  Icon,
  label,
  value,
  wide,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-3 ${wide ? "col-span-2" : ""}`}
    >
      <p className="mb-0.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
        <Icon size={10} />
        {label}
      </p>
      <p className="text-xs font-medium text-foreground leading-snug">
        {value}
      </p>
    </div>
  );
}
