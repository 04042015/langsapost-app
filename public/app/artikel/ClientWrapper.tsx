"use client"

import dynamic from "next/dynamic"
import type { Article } from "./types"

// Import komponen client-side
const ArtikelClient = dynamic(() => import("./ArtikelClient"), { ssr: false })

export default function ClientWrapper({ articles }: { articles: Article[] }) {
  return <ArtikelClient articles={articles} />
}
