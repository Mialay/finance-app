import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Finanzen",
    short_name: "Finanzen",
    description: "Gemeinsamer Überblick über eure Finanzen.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f7f8",
    theme_color: "#102033",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
