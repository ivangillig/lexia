"use client";
import { Code2, Heart } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (q: string) => void;
  onReset?: () => void;
  showSearch?: boolean;
  loading?: boolean;
}

const Header = ({ onSearch, onReset, showSearch = false, loading = false }: HeaderProps) => {
  const [q, setQ] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim() && onSearch) onSearch(q.trim());
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-8 lg:px-12">
        <button onClick={onReset} className="flex items-center gap-2.5 shrink-0 cursor-pointer">
          <div className="h-8 w-8 rounded-xl btn-primary-gradient flex items-center justify-center">
            <span className="text-xs font-bold text-primary-foreground tracking-tight">Lx</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">LexIA</span>
        </button>

        {showSearch ? (
          <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-8 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nueva busqueda..."
              className="flex-1 h-9 px-4 rounded-xl text-sm bg-secondary text-foreground placeholder:text-muted-foreground outline-none border border-border focus:border-primary/40 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !q.trim()}
              className="btn-primary-gradient h-9 px-4 rounded-xl text-xs font-semibold text-primary-foreground disabled:opacity-50 cursor-pointer shrink-0"
            >
              {loading ? "..." : "Buscar"}
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ivangillig/smart-ruling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary"
            >
              <Code2 size={15} />
              GitHub
            </a>
            <a
              href="#donar"
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold btn-primary-gradient text-primary-foreground transition-all duration-200"
            >
              <Heart size={13} />
              Donar
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;