export interface Article {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  featured_image: string | null
  status: "draft" | "published"
  author_id: string
  created_at: string
  updated_at: string
  published_at: string | null
  tags: string[] | null
  category: string | null
  meta_title: string | null
  meta_description: string | null
  reading_time: number | null
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  color: string
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Comment {
  id: string
  article_id: string
  author_name: string
  author_email: string
  content: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}
