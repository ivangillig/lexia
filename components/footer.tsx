"use client";
import { Code2, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Footer = () => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer
      ref={ref}
      className="relative px-6 pt-16 pb-8"
      style={{
        background: "hsl(var(--footer-bg))",
        color: "hsl(var(--footer-fg))",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <div className={`reveal ${isVisible ? "visible" : ""}`}>
          <div className="grid gap-10 sm:grid-cols-3 mb-12">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="h-8 w-8 rounded-xl btn-primary-gradient flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground tracking-tight">
                    Lx
                  </span>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{ color: "hsl(var(--footer-fg-strong))" }}
                >
                  Lexia
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-xs">
                Motor de busqueda juridico potenciado con inteligencia
                artificial. Proyecto open source.
              </p>
            </div>
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "hsl(var(--footer-fg-strong))" }}
              >
                Producto
              </h4>
              <ul className="space-y-2.5">
                {["Buscador", "Como funciona", "API", "Changelog"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-xs transition-colors duration-200 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "hsl(var(--footer-fg-strong))" }}
              >
                Legal
              </h4>
              <ul className="space-y-2.5">
                {["Terminos de uso", "Privacidad", "Licencia", "Contacto"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-xs transition-colors duration-200 hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div
            className="h-px w-full mb-6"
            style={{ background: "hsl(var(--footer-border))" }}
          />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-[11px]">
              &copy; {new Date().getFullYear()} Lexia. Todos los derechos
              reservados.
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ivangillig/smart-ruling"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] transition-colors duration-200 hover:text-white"
              >
                <Code2 size={14} />
                GitHub
                <ArrowUpRight size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
