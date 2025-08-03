import { getPublishedArticles } from "@/lib/supabase/articles"
import ClientWrapper from "./ClientWrapper"

export default async function ArtikelPage() {
  const articles = await getPublishedArticles()
  return <ClientWrapper articles={articles} />
}
