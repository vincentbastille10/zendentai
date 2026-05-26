export type AmbienceId = "ocean" | "mountain" | "forest" | "space";
export type AudioId = "ocean" | "rain" | "wind" | "forest";

export interface Ambience {
  id: AmbienceId;
  name: string;
  description: string;
  gradient: string;
  gradientDark: string;
  particleColor: string;
  audioId: AudioId;
  accentColor: string;
  emoji: string;
}

export const ambiences: Ambience[] = [
  {
    id: "ocean",
    name: "Bord de mer",
    description: "Le doux murmure des vagues apaise l'esprit",
    gradient: "linear-gradient(145deg, #0ea5e9 0%, #0891b2 40%, #0e7490 80%, #164e63 100%)",
    gradientDark: "linear-gradient(145deg, #082f49 0%, #0c4a6e 50%, #164e63 100%)",
    particleColor: "rgba(125, 211, 252, 0.7)",
    audioId: "ocean",
    accentColor: "#38bdf8",
    emoji: "🌊",
  },
  {
    id: "mountain",
    name: "Montagne douce",
    description: "L'air pur des cimes illumine chaque respiration",
    gradient: "linear-gradient(145deg, #a78bfa 0%, #8b5cf6 40%, #7c3aed 80%, #4c1d95 100%)",
    gradientDark: "linear-gradient(145deg, #2e1065 0%, #3b0764 50%, #4c1d95 100%)",
    particleColor: "rgba(196, 181, 253, 0.7)",
    audioId: "wind",
    accentColor: "#c4b5fd",
    emoji: "⛰️",
  },
  {
    id: "forest",
    name: "Forêt claire",
    description: "La lumière filtrée entre les feuilles invite au calme",
    gradient: "linear-gradient(145deg, #34d399 0%, #10b981 40%, #059669 80%, #064e3b 100%)",
    gradientDark: "linear-gradient(145deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
    particleColor: "rgba(110, 231, 183, 0.7)",
    audioId: "forest",
    accentColor: "#6ee7b7",
    emoji: "🌿",
  },
  {
    id: "space",
    name: "Ciel étoilé",
    description: "L'infini du cosmos invite à lâcher prise",
    gradient: "linear-gradient(145deg, #1e1b4b 0%, #312e81 30%, #1e1b4b 60%, #0f0f23 100%)",
    gradientDark: "linear-gradient(145deg, #030712 0%, #0f0a1e 50%, #1e1b4b 100%)",
    particleColor: "rgba(224, 231, 255, 0.9)",
    audioId: "rain",
    accentColor: "#e0e7ff",
    emoji: "✨",
  },
];
