"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Megaphone } from "lucide-react"

/**
 * Simple marquee-style breaking news banner.
 * Ganti API fetch sesuai kebutuhan production.
 */
export default function LiveBreakingNews() {
  const [headline, setHeadline] = useState<string | null>(null)

  useEffect(() => {
    // TODO: fetch breaking-news headline from your API / Supabase
    // Demo headline
    setHeadline("Breaking: Follow Media Sosial kami lain nya @LANGSAPOST.ID.")
  }, [])

  if (!headline) return null

  return (
    <Alert variant="destructive" className="rounded-none flex items-center gap-2">
      <Megaphone className="h-4 w-4" />
      <div className="overflow-hidden whitespace-nowrap animate-marquee">
        <AlertTitle className="sr-only">Breaking News</AlertTitle>
        <AlertDescription>{headline}</AlertDescription>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </Alert>
  )
}
