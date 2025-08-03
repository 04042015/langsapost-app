import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LangsaPost - Portal Berita Terkini",
  description: "Berita terbaru seputar Langsa, Indonesia, dan dunia.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
          <Footer /> {/* Footer global */}
        </Providers>
      </body>
    </html>
  )
}
