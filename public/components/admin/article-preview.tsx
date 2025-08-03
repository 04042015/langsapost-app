"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import type { Article } from "@/lib/types"
import Image from "next/image"

interface ArticlePreviewProps {
  article: Article
  onBack: () => void
}

export function ArticlePreview({ article, onBack }: ArticlePreviewProps) {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
      </div>

      <article className="space-y-6">
        {/* Featured Image */}
        {article.featured_image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={article.featured_image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>

          {article.excerpt && <p className="text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>}

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.created_at).toLocaleDateString()}</span>
            </div>

            {article.reading_time && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{article.reading_time} min read</span>
              </div>
            )}

            {article.category && (
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span className="capitalize">{article.category}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: article.content?.replace(/\n/g, "<br>") || "",
            }}
          />
        </div>

        {/* Article Footer */}
        <footer className="border-t pt-6 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>Last updated: {new Date(article.updated_at).toLocaleDateString()}</div>
            {article.published_at && <div>Published: {new Date(article.published_at).toLocaleDateString()}</div>}
          </div>
        </footer>
      </article>
    </div>
  )
}
