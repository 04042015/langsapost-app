"use client"

import { useState, useEffect } from "react" 
import { Button } from "@/components/ui/button" 
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { Textarea } from "@/components/ui/textarea" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select" 
import { Badge } from "@/components/ui/badge" 
import { ArrowLeft, Save, Eye, Send, X } from "lucide-react" 
import { createClient } from "@/utils/supabase/client" 
import type { Article, Category } from "@/lib/types" 
import { RichTextEditor } from "./rich-text-editor" 
import { ImageUpload } from "./image-upload" 
import { generateSlug, calculateReadingTime } from "@/lib/utils/slug" 
import { toast } from "@/hooks/use-toast"

interface ArticleFormProps {
  article?: Article | null 
  onSuccess: () => void 
  onCancel: () => void 
}

export function ArticleForm({ article, onSuccess, onCancel }: ArticleFormProps) { 
  const [formData, setFormData] = 
    useState({ 
      title: "", 
      slug: "", 
      content: "", 
      excerpt: "", 
      featured_image: "", 
      status: "draft" as "draft" | "published", 
      category: "", 
      tags: [] as string[], 
      meta_title: "", 
      meta_description: "", 
    }) 
    const [categories, setCategories] = useState<Category[]>([]) 
    const [tagInput, setTagInput] = useState("") 
    const [loading, setLoading] = useState(false) 
    const [previewMode, setPreviewMode] = useState(false)

const supabase = createClient()

useEffect(() => 
  { const fetchCategories = async () => { 
    try { 
      const { data, error } = await supabase.from("categories").select("*") 
        if (error) 
        { console.error("FETCH CATEGORIES ERROR:", error) } 
        else { setCategories(data || [])  } }
    catch (error) { 
      console.error("Error fetching categories:", error) 
    } 
  }

fetchCategories()

}, [])

useEffect(() => { 
  if (article) { 
    setFormData({ 
      title: article.title, 
      slug: article.slug, 
      excerpt: article.excerpt || "", 
      content: article.content || "", 
      category: article.category || "", 
      tags: article.tags || [], 
      featured_image: article.featured_image || "", 
      meta_title: article.meta_title || "", 
      meta_description: article.meta_description || "", 
      status: article.status || "draft",
    })
  } 
}, [article])

const handleTitleChange = (title: string) => { 
  setFormData((prev) => ({ 
    ...prev, 
    title,
    slug: !article ? generateSlug(title) : prev.slug, 
  })) 
}

const addTag = () => { 
  if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
    setFormData((prev) => ({ 
      ...prev,
      tags: [...prev.tags, tagInput.trim()], 
    })) 
      setTagInput("") 
  }
}

const removeTag = (tagToRemove: string) => { 
  setFormData((prev) => ({ 
    ...prev,
    tags: prev.tags.filter((tag) => tag !== tagToRemove), })) }

const handleSubmit = async (status: "draft" | "published") => { 
  if (!formData.title.trim()) { 
    toast({ 
      title: "Error", 
      description: "Title is required", 
      variant: "destructive", 
    }) 
      return 
  }

setLoading(true)

try {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  const articleData = {
    title: formData.title,
    slug: formData.slug,
    content: formData.content,
    excerpt: formData.excerpt,
    category: formData.category,
    author: user.id,
    image_url: formData.featured_image,
    status,
    featured: false,
    views: 0,
    tags: formData.tags,
    reading_time: calculateReadingTime(formData.content),
    meta_title: formData.meta_title || formData.title,
    meta_description: formData.meta_description || formData.excerpt,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  }

  if (article) {
    const { error } = await supabase.from("articles").update(articleData).eq("id", article.id)
    if (error) throw error
  } else {
    const { error } = await supabase.from("articles").insert([articleData])
    if (error) throw error
  }

  toast({
    title: "Success",
    description: `Article ${article ? "updated" : "created"} successfully!`,
  })

  onSuccess()
} catch (error) {
  console.error("Error saving article:", error)
  toast({
    title: "Error",
    description: "Failed to save article. Please try again.",
    variant: "destructive",
  })
} finally {
  setLoading(false)
}

}

  if (previewMode) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setPreviewMode(false)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSubmit("published")} disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <article className="prose prose-lg max-w-none">
          {formData.featured_image && (
            <img
              src={formData.featured_image || "/placeholder.svg"}
              alt={formData.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          <h1>{formData.title}</h1>
          {formData.excerpt && <p className="text-xl text-muted-foreground italic">{formData.excerpt}</p>}
          <div dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, "<br>") }} />
        </article>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{article ? "Edit Artikel" : "Buat Artikel Baru"}</h1>
            <p className="text-gray-600">
              {article ? "Perbarui artikel Anda" : "Tulis dan publikasikan artikel berita"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Simpan Draft
          </Button>
          <Button onClick={() => handleSubmit("published")} disabled={loading} className="bg-red-500 hover:bg-red-600">
            <Send className="h-4 w-4 mr-2" />
            Publikasikan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Artikel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul artikel..."
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-artikel-anda"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Ringkasan singkat artikel Anda..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Konten Artikel *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                  placeholder="Tulis konten artikel di sini..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your article for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
                  placeholder="SEO title (leave empty to use article title)"
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, meta_description: e.target.value }))}
                  placeholder="SEO description (leave empty to use excerpt)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featured_image}
                onChange={(url) => setFormData((prev) => ({ ...prev, featured_image: url }))}
                onRemove={() => setFormData((prev) => ({ ...prev, featured_image: "" }))}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Word Count:</span>
                <span>{formData.content.trim().split(/\s+/).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Reading Time:</span>
                <span>{calculateReadingTime(formData.content)} min</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <Badge variant={formData.status === "published" ? "default" : "secondary"}>{formData.status}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
