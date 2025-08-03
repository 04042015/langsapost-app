"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import ArticleCardSupabase from "@/components/ArticleCardSupabase"
import type { Article } from "./types"

export default function ArtikelClient({ articles }: { articles: Article[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("terbaru")

  const filteredArticles = useMemo(() => {
    let filtered = [...articles]

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    switch (sortBy) {
      case "terlama":
        filtered.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime())
        break
      default:
        filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
        break
    }

    return filtered
  }, [articles, searchTerm, selectedCategory, sortBy])

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Semua Kategori</option>
              <option value="politik">Politik</option>
              <option value="ekonomi">Ekonomi</option>
              <option value="olahraga">Olahraga</option>
              <option value="teknologi">Teknologi</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="internasional">Internasional</option>
              <option value="nasional">Nasional</option>
              <option value="hiburan">Hiburan</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="otomotif">Otomotif</option>
              <option value="langsa">Langsa</option>
              <option value="loker">Loker</option>
              <option value="zodiak">Zodiak</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="terbaru">Terbaru</option>
              <option value="terpopuler">Terpopuler</option>
              <option value="terlama">Terlama</option>
            </select>
          </div>
        </div>
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredArticles.map((article) => (
            <ArticleCardSupabase key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">Tidak ada artikel yang ditemukan.</p>
        </div>
      )}
    </div>
  )
    }
