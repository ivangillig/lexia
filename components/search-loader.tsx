"use client";
import { useEffect, useState } from "react";
import { Brain, Scale, BookOpen, Sparkles } from "lucide-react";

const STEPS = [
  {
    Icon: Brain,
    text: "Interpretando tu consulta...",
    sub: "Expansión semántica con IA",
  },
  {
    Icon: BookOpen,
    text: "Revisando 64.000 fallos laborales...",
    sub: "Búsqueda vectorial en jurisprudencia",
  },
  {
    Icon: Scale,
    text: "Analizando relevancia jurídica...",
    sub: "Comparación por similitud",
  },
  {
    Icon: Sparkles,
    text: "Seleccionando los más relevantes...",
    sub: "Reranking con modelo de lenguaje",
  },
] as const;

const STEP_DURATION = 3200; // ms por paso
const FADE_DURATION = 500; // ms de fade out antes de cambiar

export function SearchLoader() {
  const [stepIdx, setStepIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setStepIdx((i) => (i + 1) % STEPS.length);
        setVisible(true);
      }, FADE_DURATION);
    }, STEP_DURATION);

    return () => clearInterval(timer);
  }, []);

  const { Icon, text, sub } = STEPS[stepIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-10 select-none">
      {/* Icono animado */}
      <div
        className={`flex flex-col items-center gap-5 transition-all duration-500 ease-in-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Halo exterior pulsante */}
          <span className="absolute inset-0 rounded-2xl bg-primary/10 animate-pulse" />
          {/* Fondo del icono */}
          <div className="relative w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/10">
            <Icon size={28} className="text-primary" strokeWidth={1.6} />
          </div>
        </div>

        {/* Texto */}
        <div className="text-center">
          <p className="text-base font-semibold text-foreground tracking-tight">
            {text}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === stepIdx
                ? "w-7 bg-primary"
                : i < stepIdx
                  ? "w-2 bg-primary/40"
                  : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
