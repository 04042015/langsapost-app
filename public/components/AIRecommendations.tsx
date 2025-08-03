"use client"

import { useState, useEffect } from "react"
import { Brain } from "lucide-react"

interface RecommendedArticle {
  id: number
  title: string
  excerpt: string
  category: string
  categorySlug: string
  author: string
  date: string
  slug: string
  image: string
  views: number
  relevanceScore: number
  reason: string
}

export default function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendedArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI recommendation engine
    const generateRecommendations = () => {
      const mockRecommendations: RecommendedArticle[] = [
        {
          id: 101,
          title: "Revolusi Digital Banking Indonesia: Masa Depan Transaksi Keuangan",
          excerpt:
            "Teknologi blockchain dan AI mengubah landscape perbankan Indonesia dengan inovasi yang menakjubkan.",
          category: "Teknologi",
          categorySlug: "teknologi",
          author: "Tech Analyst",
          date: "09 Jul 2025",
          slug: "revolusi-digital-banking-indonesia",
          image: "/placeholder.svg?height=300&width=400",
          views: 1850,
          relevanceScore: 95,
          reason: "Berdasarkan minat Anda pada teknologi dan ekonomi",
        },
        {
          id: 102,
          title: "Strategi Investasi Cerdas di Era Ekonomi Digital",
          excerpt: "Para ahli ekonomi memberikan panduan investasi yang tepat untuk menghadapi transformasi digital.",
          category: "Ekonomi",
          categorySlug: "ekonomi",
          author: "Investment Expert",
          date: "09 Jul 2025",
          slug: "strategi-investasi-cerdas-era-digital",
          image: "/placeholder.svg?height=300&width=400",
          views: 2100,
          relevanceScore: 92,
          reason: "Artikel serupa yang Anda baca sebelumnya",
        },
        {
          id: 103,
          title: "Inovasi Startup Indonesia yang Mendunia",
          excerpt: "Kisah inspiratif startup Indonesia yang berhasil menembus pasar global dengan teknologi inovatif.",
          category: "Bisnis",
          categorySlug: "bisnis",
          author: "Startup Reporter",
          date: "08 Jul 2025",
          slug: "inovasi-startup-indonesia-mendunia",
          image: "/placeholder.svg?height=300&width=400",
          views: 1650,
          relevanceScore: 88,
          reason: "Trending di kalangan pembaca seperti Anda",
        },
      ]

      setTimeout(() => {
        setRecommendations(mockRecommendations)
        setLoading(false)
      }, 1500)
    }

    generateRecommendations()
  }, [])

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500 animate-pulse" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Recommendations</h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-5 h-5 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Rekomendasi AI</h3>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs font-medium">
          Powered by AI
        </span>
      </div>

      <div className="space-y-6">
        {recommendations.map((article) => (
          <div key={article.id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-purple-500 cursor-pointer transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                      {article.relevanceScore}% match
                    </span>
                    <span>{article.views} views</span>
                  </div>
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 italic">{article.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-purple-500 hover:text-purple-600 text-sm font-medium transition-colors">
          Lihat lebih banyak rekomendasi AI →
        </button>
      </div>
    </div>
  )
}
