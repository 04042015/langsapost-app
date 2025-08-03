import { NextResponse } from "next/server"

export async function GET() {
  const manifest = {
    name: "LangsaPost - Portal Berita Terpercaya",
    short_name: "LangsaPost",
    description: "Portal berita terpercaya dengan informasi terkini dari seluruh Indonesia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ef4444",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
    ],
    categories: ["news", "magazines"],
    lang: "id",
    dir: "ltr",
    shortcuts: [
      {
        name: "Berita Terkini",
        short_name: "Terkini",
        description: "Lihat berita terkini",
        url: "/artikel",
        icons: [{ src: "/icon-192x192.png", sizes: "192x192" }],
      },
      {
        name: "Politik",
        short_name: "Politik",
        description: "Berita politik terbaru",
        url: "/kategori/politik",
        icons: [{ src: "/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  }

  return NextResponse.json(manifest)
}
