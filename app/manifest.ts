import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZenDentAI",
    short_name: "ZenDent",
    description: "Prenez quelques minutes pour vous avant votre rendez-vous",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#7EC8C8",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
