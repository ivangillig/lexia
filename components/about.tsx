"use client";
import { Brain, Zap, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    icon: Brain,
    title: "Lenguaje natural",
    text: "Escribi como si le hablaras a un colega. Nuestra IA interpreta tu consulta y encuentra los fallos mas relevantes.",
  },
  {
    icon: Zap,
    title: "Resultados instantaneos",
    text: "Procesamos miles de sumarios de jurisprudencia laboral en segundos, con el holding legal ya extraido.",
  },
  {
    icon: Shield,
    title: "Fuentes oficiales",
    text: "Toda la informacion proviene del SAIJ (Sistema Argentino de Informatica Juridica), fuente oficial del Estado.",
  },
];

const About = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section ref={ref} className="relative px-6 py-28 overflow-hidden">
      <div className="mesh-gradient pointer-events-none absolute inset-0" />
      <div className="mx-auto max-w-3xl text-center relative z-10">
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
            Sobre Lexia
          </p>
          <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Un buscador de fallos laborales
            <br className="hidden sm:block" />{" "}
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              potenciado con inteligencia artificial
            </span>
          </h2>
          <p className="mx-auto mb-16 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Lexia permite a abogados y profesionales consultar fallos de
            jurisprudencia laboral de forma simple. Escribi tu pregunta en
            lenguaje natural y recibe los precedentes mas relevantes con el
            holding legal de cada fallo.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${i + 1} group`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/25 group-hover:scale-110">
                <f.icon size={24} />
              </div>
              <h3 className="mb-2 text-sm font-bold text-foreground">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
