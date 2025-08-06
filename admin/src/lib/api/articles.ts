import { supabase } from '@/lib/supabase';
import { ArticleInput } from '@/lib/validations/articleSchema';

export async function createArticle(payload: ArticleInput) {
  const { data, error } = await supabase.from('articles').insert([payload]);

  if (error) {
    throw new Error(error.message || 'Gagal membuat artikel');
  }

  return data;
}
