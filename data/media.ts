// Centralise toutes les URLs médias.
// Pour remplacer par de vrais fichiers : modifier les champs `local`.
// Pour utiliser un CDN : modifier les champs `cdn`.
// Le composant AmbienceSelector utilise `getImageSrc()` avec fallback gradient.

export type MediaSource = {
  local: string;
  cdn: string;
};

export const images: Record<string, MediaSource> = {
  "ocean-01": {
    local: "/images/ocean/main.jpg",
    cdn: "https://cdn.example.com/zendent/ocean/image-01.jpg",
  },
  "mountain-01": {
    local: "/images/mountain/main.jpg",
    cdn: "https://cdn.example.com/zendent/mountain/image-01.jpg",
  },
  "forest-01": {
    local: "/images/forest/main.jpg",
    cdn: "https://cdn.example.com/zendent/forest/image-01.jpg",
  },
  "space-01": {
    local: "/images/space/main.jpg",
    cdn: "https://cdn.example.com/zendent/space/image-01.jpg",
  },
};

export const audio: Record<string, MediaSource> = {
  ocean: {
    local: "/audio/ocean/waves.mp3",
    cdn: "https://cdn.example.com/zendent/ocean/audio-waves.mp3",
  },
  rain: {
    local: "/audio/rain/soft-rain.mp3",
    cdn: "https://cdn.example.com/zendent/rain/audio-rain.mp3",
  },
  wind: {
    local: "/audio/wind/mountain-wind.mp3",
    cdn: "https://cdn.example.com/zendent/wind/audio-wind.mp3",
  },
  forest: {
    local: "/audio/forest/birds.mp3",
    cdn: "https://cdn.example.com/zendent/forest/audio-birds.mp3",
  },
};

export const video: Record<string, MediaSource> = {
  ocean: {
    local: "/video/ocean/loop.mp4",
    cdn: "https://cdn.example.com/zendent/ocean/video-01.mp4",
  },
  forest: {
    local: "/video/forest/loop.mp4",
    cdn: "https://cdn.example.com/zendent/forest/video-01.mp4",
  },
  space: {
    local: "/video/space/loop.mp4",
    cdn: "https://cdn.example.com/zendent/space/video-01.mp4",
  },
};

// Retourne la source locale en priorité, puis CDN.
// Si aucun fichier n'existe, le composant utilise son gradient CSS de secours.
export function getMediaSrc(map: Record<string, MediaSource>, key: string, useCdn = false): string {
  const entry = map[key];
  if (!entry) return "";
  return useCdn ? entry.cdn : entry.local;
}
