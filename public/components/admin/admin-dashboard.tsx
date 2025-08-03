"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, FileText, Eye, Edit, Trash2, BarChart3, TrendingUp, MessageSquare } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import type { Article } from "@/lib/types"
import { ArticleForm } from "./article-form"
import { ArticlePreview } from "./article-preview"
import { AdminHeader } from "./admin-header"
import { toast } from "@/hooks/use-toast"

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    views: 0,
  })

  const supabase = createClient()

  useEffect(() => {
    fetchArticles()
    fetchStats()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
      toast({
        title: "Error",
        description: "Gagal memuat artikel",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.from("articles").select("status")

      if (error) throw error

      const total = data?.length || 0
      const published = data?.filter((a) => a.status === "published").length || 0
      const drafts = data?.filter((a) => a.status === "draft").length || 0

      setStats({
        total,
        published,
        drafts,
        views: Math.floor(Math.random() * 50000), // Mock data
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini?")) return

    try {
      const { error } = await supabase.from("articles").delete().eq("id", id)

      if (error) throw error

      setArticles(articles.filter((a) => a.id !== id))
      toast({
        title: "Berhasil",
        description: "Artikel berhasil dihapus",
      })
    } catch (error) {
      console.error("Error deleting article:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus artikel",
        variant: "destructive",
      })
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingArticle(null)
    fetchArticles()
    fetchStats()
  }

  if (showForm || editingArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <ArticleForm
          article={editingArticle}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingArticle(null)
          }}
        />
      </div>
    )
  }

  if (previewArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <ArticlePreview article={previewArticle} onBack={() => setPreviewArticle(null)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="container mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">Kelola konten portal berita LangsaPost</p>
          </div>
          <Button onClick={() => setShowForm(true)} className="gap-2 bg-red-500 hover:bg-red-600">
            <Plus className="h-4 w-4" />
            Artikel Baru
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Artikel</CardTitle>
              <FileText className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <p className="text-xs text-gray-500 mt-1">Semua artikel</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Dipublikasi</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.published}</div>
              <p className="text-xs text-gray-500 mt-1">Artikel live</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Draft</CardTitle>
              <Edit className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.drafts}</div>
              <p className="text-xs text-gray-500 mt-1">Belum dipublikasi</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.views.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Pembaca bulan ini</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="articles" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Artikel</TabsTrigger>
            <TabsTrigger value="categories">Kategori</TabsTrigger>
            <TabsTrigger value="comments">Komentar</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900">Manajemen Artikel</CardTitle>
                <CardDescription>Kelola semua artikel berita LangsaPost</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                    <p className="mt-2 text-gray-500">Memuat artikel...</p>
                  </div>
                ) : articles.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum ada artikel</h3>
                    <p className="text-gray-500 mb-4">Mulai dengan membuat artikel pertama Anda</p>
                    <Button onClick={() => setShowForm(true)} className="bg-red-500 hover:bg-red-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Buat Artikel
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div
                        key={article.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{article.title}</h3>
                            <Badge
                              variant={article.status === "published" ? "default" : "secondary"}
                              className={article.status === "published" ? "bg-green-500" : ""}
                            >
                              {article.status === "published" ? "Dipublikasi" : "Draft"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{article.excerpt || "Tidak ada ringkasan"}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Dibuat: {new Date(article.created_at).toLocaleDateString("id-ID")}</span>
                            {article.published_at && (
                              <span>Dipublikasi: {new Date(article.published_at).toLocaleDateString("id-ID")}</span>
                            )}
                            {article.category && <span className="capitalize">Kategori: {article.category}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setPreviewArticle(article)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setEditingArticle(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(article.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Kategori</CardTitle>
                <CardDescription>Kelola kategori artikel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Manajemen kategori akan segera hadir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Komentar</CardTitle>
                <CardDescription>Moderasi komentar pembaca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Sistem moderasi komentar akan segera hadir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analitik</CardTitle>
                <CardDescription>Statistik dan performa artikel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">Dashboard analitik akan segera hadir...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
