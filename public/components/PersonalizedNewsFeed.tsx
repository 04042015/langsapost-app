"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Clock, BookOpen, Target, Zap, Brain, Sparkles } from "lucide-react"

interface UserPreferences {
  categories: { [key: string]: number }
  readingTime: number[]
  contentType: string[]
  updateFrequency: string
  aiPersonalization: boolean
}

interface PersonalizedArticle {
  id: string
  title: string
  excerpt: string
  category: string
  readingTime: number
  relevanceScore: number
  personalizedReason: string
  trending: boolean
  featured_image?: string
  slug: string
  created_at: string
}

export function PersonalizedNewsFeed() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    categories: {
      politik: 80,
      ekonomi: 60,
      teknologi: 90,
      olahraga: 40,
      kesehatan: 70,
      langsa: 85,
    },
    readingTime: [5],
    contentType: ["artikel", "analisis"],
    updateFrequency: "realtime",
    aiPersonalization: true,
  })

  const [personalizedArticles, setPersonalizedArticles] = useState<PersonalizedArticle[]>([])
  const [activeTab, setActiveTab] = useState("feed")

  // Mock personalized articles
  useEffect(() => {
    const mockArticles: PersonalizedArticle[] = [
      {
        id: "1",
        title: "Revolusi Teknologi AI di Indonesia: Masa Depan yang Cerah",
        excerpt: "Perkembangan kecerdasan buatan di Indonesia menunjukkan tren positif dengan berbagai inovasi...",
        category: "teknologi",
        readingTime: 4,
        relevanceScore: 95,
        personalizedReason: "Sesuai minat teknologi Anda (90%)",
        trending: true,
        featured_image: "/placeholder.svg?height=200&width=300",
        slug: "revolusi-teknologi-ai-indonesia",
        created_at: "2025-07-08T10:00:00Z",
      },
      {
        id: "2",
        title: "Pembangunan Smart City Langsa: Langkah Menuju Digitalisasi",
        excerpt:
          "Kota Langsa meluncurkan program smart city yang akan mengintegrasikan teknologi dalam pelayanan publik...",
        category: "langsa",
        readingTime: 3,
        relevanceScore: 88,
        personalizedReason: "Berita lokal Langsa yang Anda ikuti",
        trending: false,
        featured_image: "/placeholder.svg?height=200&width=300",
        slug: "smart-city-langsa-digitalisasi",
        created_at: "2025-07-08T09:30:00Z",
      },
      {
        id: "3",
        title: "Kebijakan Ekonomi Digital: Dampak untuk UMKM Indonesia",
        excerpt: "Pemerintah meluncurkan kebijakan baru untuk mendukung transformasi digital UMKM...",
        category: "ekonomi",
        readingTime: 6,
        relevanceScore: 75,
        personalizedReason: "Berdasarkan artikel ekonomi yang sering Anda baca",
        trending: true,
        featured_image: "/placeholder.svg?height=200&width=300",
        slug: "kebijakan-ekonomi-digital-umkm",
        created_at: "2025-07-08T08:45:00Z",
      },
    ]

    setPersonalizedArticles(mockArticles)
  }, [preferences])

  const updateCategoryPreference = (category: string, value: number) => {
    setPreferences((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: value,
      },
    }))
  }

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 75) return "bg-yellow-500"
    return "bg-gray-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Feed Berita Personal
        </CardTitle>
        <CardDescription>Berita yang dipersonalisasi berdasarkan minat dan kebiasaan baca Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">Feed Personal</TabsTrigger>
            <TabsTrigger value="preferences">Preferensi</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            {/* AI Personalization Status */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-semibold">AI Personalization Active</h4>
                  <p className="text-sm text-gray-600">Feed dioptimalkan berdasarkan 127 interaksi Anda</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Zap className="h-3 w-3 mr-1" />
                Smart
              </Badge>
            </div>

            {/* Personalized Articles */}
            <div className="space-y-6">
              {personalizedArticles.map((article) => (
                <div key={article.id} className="relative">
                  {/* Relevance Indicator */}
                  <div className="absolute -left-2 top-4 z-10">
                    <div
                      className={`w-1 h-16 rounded-full ${getRelevanceColor(article.relevanceScore)}`}
                      title={`Relevance: ${article.relevanceScore}%`}
                    />
                  </div>

                  <Card className="ml-4 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {article.category}
                          </Badge>
                          {article.trending && (
                            <Badge variant="destructive" className="animate-pulse">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <Badge variant="secondary">
                            <Clock className="h-3 w-3 mr-1" />
                            {article.readingTime} min
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-purple-600">{article.relevanceScore}%</div>
                          <div className="text-xs text-gray-500">relevance</div>
                        </div>
                      </div>

                      <h3 className="font-bold text-lg mb-2 hover:text-red-500 cursor-pointer">{article.title}</h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
                          <Target className="h-3 w-3" />
                          {article.personalizedReason}
                        </div>
                        <Button variant="ghost" size="sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Baca
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            {/* Category Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferensi Kategori</CardTitle>
                <CardDescription>Sesuaikan minat Anda untuk mendapatkan berita yang lebih relevan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(preferences.categories).map(([category, value]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize font-medium">{category}</span>
                      <span className="text-sm text-gray-500">{value}%</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(newValue) => updateCategoryPreference(category, newValue[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reading Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferensi Baca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Waktu Baca Maksimal: {preferences.readingTime[0]} menit
                  </label>
                  <Slider
                    value={preferences.readingTime}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, readingTime: value }))}
                    max={15}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Frekuensi Update</label>
                  <div className="flex gap-2">
                    {["realtime", "hourly", "daily"].map((freq) => (
                      <Button
                        key={freq}
                        variant={preferences.updateFrequency === freq ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreferences((prev) => ({ ...prev, updateFrequency: freq }))}
                      >
                        {freq === "realtime" ? "Real-time" : freq === "hourly" ? "Per Jam" : "Harian"}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            {/* Reading Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-gray-600">Artikel Dibaca</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">3.2</div>
                  <div className="text-sm text-gray-600">Rata-rata/Hari</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Akurasi AI</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">12</div>
                  <div className="text-sm text-gray-600">Artikel Disimpan</div>
                </CardContent>
              </Card>
            </div>

            {/* Top Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kategori Favorit Anda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(preferences.categories)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([category, value], index) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="capitalize font-medium">{category}</span>
                        </div>
                        <Badge variant="secondary">{value}% minat</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
