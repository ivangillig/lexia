export const TRIBUNALES: Record<string, { label: string; color: string }> = {
  CS: {
    label: "Corte Suprema de Justicia de la Nación",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  CNAT: {
    label: "Cámara Nacional de Apelaciones del Trabajo",
    color: "bg-blue-500/10 text-blue-600",
  },
  CNT: {
    label: "Cámara Nacional del Trabajo",
    color: "bg-blue-500/10 text-blue-600",
  },
  CNAC: {
    label: "Cámara Nacional de Apelaciones en lo Civil",
    color: "bg-slate-500/10 text-slate-600",
  },
  CNACOM: {
    label: "Cámara Nacional de Apelaciones en lo Comercial",
    color: "bg-slate-500/10 text-slate-600",
  },
  CFP: {
    label: "Cámara Federal de la Plata",
    color: "bg-violet-500/10 text-violet-600",
  },
  CFSS: {
    label: "Cámara Federal de la Seguridad Social",
    color: "bg-violet-500/10 text-violet-600",
  },
  CFSM: {
    label: "Cámara Federal de San Martín",
    color: "bg-violet-500/10 text-violet-600",
  },
  CFBA: {
    label: "Cámara Federal de Buenos Aires",
    color: "bg-violet-500/10 text-violet-600",
  },
  STBA: {
    label: "Suprema Corte de la Provincia de Buenos Aires",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  STCBA: {
    label: "Superior Tribunal de la Ciudad de Buenos Aires",
    color: "bg-teal-500/10 text-teal-600",
  },
};

/** Devuelve el label completo o el código si no está mapeado. */
export function tribunalLabel(codigo: string): string {
  return TRIBUNALES[codigo]?.label ?? codigo;
}

/** Devuelve las clases de color Tailwind para el badge. */
export function tribunalColor(codigo: string): string {
  return TRIBUNALES[codigo]?.color ?? "bg-primary/10 text-primary";
}
