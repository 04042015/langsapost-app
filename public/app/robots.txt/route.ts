import { NextResponse } from "next/server"

export async function GET() {
  const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

Sitemap: https://langsapost.vercel.app/sitemap.xml`

  return new NextResponse(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
