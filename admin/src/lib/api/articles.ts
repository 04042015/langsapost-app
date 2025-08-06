import { supabase } from "@/lib/supabase";
import { ArticleInput } from '@/lib/validations/articleSchema';

export async function createArticle(payload: ArticleInput) {
  const formattedPayload = {
    title: payload.title,
    slug: payload.slug,
    content: JSON.stringify(payload.content), // pastikan ini string
    status: payload.status,
    scheduled_at: payload.scheduled_at || null,
    featured_image_url: payload.featured_image_url || null,
    is_breaking_news: payload.is_breaking, // nama kolom disesuaikan
    category_id: payload.category_id || null,
    author_id: payload.author_id,
    meta_title: payload.seo_title || null,
    meta_description: payload.seo_description || null,
    canonical_url: payload.canonical_url || null,
    // tambahkan kolom lain jika perlu
  };

  const { data, error } = await supabase
    .from("articles")
    .insert([formattedPayload])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
