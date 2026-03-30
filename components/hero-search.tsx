"use client";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const cycleWords = ["fallos", "jurisprudencia", "sumarios", "precedentes"];

const suggestions = [
  "despido sin causa de empleado publico",
  "indemnizacion por accidente de trabajo",
  "diferencias salariales contrato laboral",
];

const rotatingExamples = [
  "despido sin causa empleado del estado",
  "indemnizacion por accidente de trabajo",
  "diferencias salariales contrato de trabajo",
  "reinstalacion trabajador irregularmente despedido",
  "horas extras no reconocidas por el empleador",
];

interface HeroSearchProps {
  onSearch: (q: string) => void;
  loading?: boolean;
}

const HeroSearch = ({ onSearch, loading = false }: HeroSearchProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [wordPhase, setWordPhase] = useState<"in" | "out">("in");

  // Cycling headline words
  useEffect(() => {
    const tOut = setTimeout(() => setWordPhase("out"), 2400);
    const tNext = setTimeout(() => {
      setWordIdx((i) => (i + 1) % cycleWords.length);
      setWordPhase("in");
    }, 2750);
    return () => {
      clearTimeout(tOut);
      clearTimeout(tNext);
    };
  }, [wordIdx]);

  useEffect(() => {
    if (query) return;
    const target = rotatingExamples[placeholderIdx];
    let charIdx = 0;
    setDisplayedPlaceholder("");
    const typeInterval = setInterval(() => {
      charIdx++;
      setDisplayedPlaceholder(target.slice(0, charIdx));
      if (charIdx >= target.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setPlaceholderIdx((prev) => (prev + 1) % rotatingExamples.length);
        }, 2500);
      }
    }, 50);
    return () => clearInterval(typeInterval);
  }, [placeholderIdx, query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-24 overflow-hidden">
      <div className="mesh-gradient pointer-events-none absolute inset-0" />
      <div className="hero-gradient pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/6 blur-3xl float" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-56 w-56 rounded-full bg-accent/8 blur-3xl float float-delay-1" />
      <div className="pointer-events-none absolute top-1/3 right-1/3 h-40 w-40 rounded-full bg-ring/5 blur-2xl float float-delay-2" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="fade-up fade-up-delay-1 mb-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.15]">
          Busca{" "}
          <span className="relative inline-block">
            {/* spacer fijo con la palabra más larga — espacio sobrante cae a la derecha */}
            <span className="invisible" aria-hidden="true">
              jurisprudencia
            </span>
            {/* palabra animada alineada a la izquierda */}
            <span
              key={wordIdx}
              className={`word-${wordPhase} text-primary absolute inset-0 flex items-center justify-start`}
            >
              {cycleWords[wordIdx]}
            </span>
          </span>
          <br />
          <span className="text-foreground">como si preguntaras.</span>
        </h1>

        <p className="fade-up fade-up-delay-2 mb-10 text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Fallos de jurisprudencia laboral argentina. Escribi tu consulta en
          lenguaje natural y recibe los precedentes mas relevantes al instante.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`fade-up fade-up-delay-3 search-glow relative rounded-2xl border-2 transition-all duration-500 ${
            focused
              ? "border-primary/30 shadow-2xl shadow-primary/10 scale-[1.02]"
              : "border-border shadow-lg shadow-foreground/3"
          } bg-card`}
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <Search
              className={`shrink-0 transition-colors duration-300 ${focused ? "text-primary" : "text-muted-foreground"}`}
              size={20}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={
                displayedPlaceholder || "Escribi tu consulta juridica..."
              }
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/60 outline-none"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="btn-primary-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-primary-foreground active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="fade-up fade-up-delay-4 mt-6 flex flex-wrap items-center justify-center gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => {
                setQuery(s);
                onSearch(s);
              }}
              className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-foreground hover:shadow-md hover:shadow-primary/6 hover:-translate-y-0.5 cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
