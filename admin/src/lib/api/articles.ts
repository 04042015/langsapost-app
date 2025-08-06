import { supabase } from '@/lib/supabase';
import { ArticleInput } from '@/lib/validations/articleSchema';

const mapArticlePayload = (input: ArticleInput) => ({
  title: input.title,
  slug: input.slug,
  content: JSON.stringify(input.content),
  status: input.status,
  scheduled_at: input.scheduled_at || null,
  featured_image_url: input.featured_image_url || null,
  is_breaking_news: input.is_breaking,
  category_id: input.category_id || null,
  author_id: input.author_id,
  meta_title: input.seo_title,
  meta_description: input.seo_description,
});

export async function createArticle(payload: ArticleInput) {
  const mapped = mapArticlePayload(payload);

  const { data, error } = await supabase
    .from('articles')
    .insert(mapped)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || 'Gagal menyimpan artikel');
  }

  return data;
}
