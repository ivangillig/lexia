"use client";
import { useState } from "react";
import Header from "@/components/header";
import HeroSearch from "@/components/hero-search";
import ExampleCards from "@/components/example-cards";
import UseCases from "@/components/use-cases";
import About from "@/components/about";
import Footer from "@/components/footer";
import { ResultCard } from "@/components/result-card";
import { SearchLoader } from "@/components/search-loader";
import type { SearchResult } from "@/app/api/search/route";

type View = "hero" | "loading" | "results";

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const FADE_MS = 400;

export default function Home() {
  const [view, setView] = useState<View>("hero");
  const [fade, setFade] = useState(true);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  async function transitionTo(next: View, setup?: () => void) {
    setFade(false);
    await sleep(FADE_MS);
    setup?.();
    setView(next);
    setFade(true);
  }

  async function handleSearch(q: string) {
    setLastQuery(q);
    setLoading(true);
    setError(null);

    await transitionTo("loading");

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("server error");
      const data = await res.json();
      await transitionTo("results", () => setResults(data.results));
    } catch {
      await transitionTo("results", () => {
        setError("No se pudo completar la busqueda. Intenta de nuevo.");
        setResults([]);
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleReset() {
    await transitionTo("hero", () => {
      setResults(null);
      setError(null);
      setLastQuery("");
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onReset={handleReset}
        showSearch={view !== "hero"}
        loading={loading}
      />

      <div
        className={`transition-opacity duration-400 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {view === "hero" && (
          <>
            <HeroSearch onSearch={handleSearch} loading={loading} />
            <ExampleCards />
            <UseCases />
            <About />
            <Footer />
          </>
        )}

        {view === "loading" && <SearchLoader />}

        {view === "results" && (
          <div className="mx-auto max-w-3xl px-6 pt-24 pb-16">
            {/* Botón volver */}
            <button
              onClick={handleReset}
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground group"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card transition-all group-hover:border-primary/30 group-hover:shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </span>
              Nueva búsqueda
            </button>

            {error && (
              <div className="mb-6 px-5 py-4 rounded-xl text-sm bg-destructive/10 text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            {results !== null && (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  {results.length > 0 ? (
                    <>
                      <span className="font-semibold text-foreground">
                        {results.length}
                      </span>{" "}
                      {results.length === 1
                        ? "jurisprudencia relevante"
                        : "jurisprudencias relevantes"}{" "}
                      para{" "}
                      <span className="font-medium text-foreground">
                        &quot;{lastQuery}&quot;
                      </span>
                    </>
                  ) : (
                    <>Sin resultados para &quot;{lastQuery}&quot;</>
                  )}
                </p>

                {results.length === 0 ? (
                  <div className="py-16 text-center rounded-2xl border border-border bg-card">
                    <p className="font-semibold mb-1 text-foreground">
                      No se encontraron jurisprudencias relevantes
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Proba con otros terminos o describe el caso con mas
                      detalle.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {results.map((r, i) => (
                      <ResultCard key={r.uuid} result={r} index={i + 1} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
