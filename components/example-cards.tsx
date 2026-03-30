"use client";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowUpRight } from "lucide-react";

const examples = [
  {
    query: "Despido sin causa de empleado del estado nacional",
    summary:
      "La Corte Suprema ha sostenido que el empleado publico con estabilidad propia tiene derecho a la reinstalacion ante un despido arbitrario, no siendo suficiente el pago de la indemnizacion...",
    tag: "Laboral",
    tagColor: "bg-blue-500/10 text-blue-600",
  },
  {
    query: "Indemnizacion por accidente de trabajo enfermedad profesional",
    summary:
      "Los tribunales han reconocido el derecho del trabajador a percibir la reparacion integral del dano sufrido con fundamento en el derecho civil, cuando la prestacion de la LRT resulta insuficiente...",
    tag: "Laboral",
    tagColor: "bg-emerald-500/10 text-emerald-600",
  },
  {
    query: "Diferencias salariales horas extras no pagadas",
    summary:
      "La jurisprudencia laboral establece que la carga de la prueba de haber abonado las horas extras recae sobre el empleador, quien debe acreditar el pago mediante recibos debidamente firmados...",
    tag: "Laboral",
    tagColor: "bg-amber-500/10 text-amber-600",
  },
];

const ExampleCards = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section className="relative px-6 py-24 section-accent overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 40px, hsl(217 91% 50%) 40px, hsl(217 91% 50%) 41px)`,
        }}
      />
      <div ref={ref} className="mx-auto max-w-5xl">
        <div
          className={`reveal ${isVisible ? "visible" : ""} mb-14 text-center`}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
            Ejemplos reales
          </p>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Asi funcionan las busquedas
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Consulta y recibe resultados claros con las fuentes relevantes.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((ex, i) => (
            <div
              key={ex.query}
              className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1} group relative rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer`}
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${ex.tagColor}`}
                  >
                    {ex.tag}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground/40 transition-all duration-300 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <h3 className="mb-3 text-sm font-semibold leading-snug text-foreground line-clamp-2">
                  &quot;{ex.query}&quot;
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                  {ex.summary}
                </p>
                <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />
                <p className="mt-3 text-[11px] font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Ver resultado completo &rarr;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleCards;
