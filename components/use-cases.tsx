"use client";
import { Scale, FileText, BookOpen, Gavel, Users, Clock } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const cases = [
  {
    icon: Scale,
    title: "Despido y estabilidad",
    description:
      "Fallos sobre despido sin causa, despido discriminatorio, reinstalacion y estabilidad del empleo publico.",
  },
  {
    icon: FileText,
    title: "Accidentes de trabajo",
    description:
      "Jurisprudencia sobre accidentes laborales, enfermedades profesionales e indemnizaciones de la LRT.",
  },
  {
    icon: BookOpen,
    title: "Remuneracion y salarios",
    description:
      "Precedentes sobre diferencias salariales, horas extras, vacaciones y beneficios no reconocidos.",
  },
  {
    icon: Gavel,
    title: "Contrato de trabajo",
    description:
      "Fallos sobre modalidades contractuales, fraude laboral, trabajo no registrado y periodo de prueba.",
  },
  {
    icon: Users,
    title: "Derecho colectivo",
    description:
      "Jurisprudencia sobre sindicatos, convenios colectivos, huelga y libertad sindical.",
  },
  {
    icon: Clock,
    title: "Credito laboral",
    description:
      "Fallos sobre prescripcion, solidaridad laboral, cesion de empresa y responsabilidad del empleador.",
  },
];

const UseCases = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative px-6 py-24 section-alt">
      <div className="mx-auto max-w-5xl">
        <div
          className={`reveal ${isVisible ? "visible" : ""} mb-14 text-center`}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
            Derecho laboral
          </p>
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Que podes buscar?
          </h2>
          <p className="text-sm text-muted-foreground">
            Mas de 64.000 sumarios de jurisprudencia laboral del SAIJ indexados
            semanticamente.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <div
              key={c.title}
              className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${Math.min(i + 1, 6)} group cursor-default rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25">
                <c.icon size={20} />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
