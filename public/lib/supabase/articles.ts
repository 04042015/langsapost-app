import { createClient } from "@/utils/supabase/client"
import type { Article } from "@/lib/types"

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq('status', 'published')
    .order('created_at', { ascending: false });  // Ganti published_at → created_at

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  return data || []
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (error) {
    console.error("Error fetching article:", error)
    return null
  }

  return data
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles by category:", error)
    return []
  }

  return data || []
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching featured article:", error)
    return null
  }

  return data
}

export async function searchArticles(query: string): Promise<Article[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .or(`title.ilike.%${query}%, content.ilike.%${query}%, excerpt.ilike.%${query}%`)
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error searching articles:", error)
    return []
  }

  return data || []
}
