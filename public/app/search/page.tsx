"use client"

import type React from "react"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import { Search, Filter } from "lucide-react"

// Sample search results
const searchResults = [
  {
    id: 1,
    title: "Presiden Jokowi Resmikan Infrastruktur Baru di Aceh",
    excerpt:
      "Presiden Joko Widodo meresmikan pembangunan infrastruktur strategis di Provinsi Aceh yang diharapkan dapat meningkatkan perekonomian daerah.",
    category: "Politik",
    categorySlug: "politik",
    author: "Ahmad Rizki",
    date: "08 Jul 2025",
    slug: "presiden-jokowi-resmikan-infrastruktur-baru-di-aceh",
    image: "/placeholder.svg?height=300&width=400",
    views: 2850,
  },
  {
    id: 2,
    title: "Ekonomi Indonesia Tumbuh 5.2% di Kuartal Kedua",
    excerpt: "Badan Pusat Statistik melaporkan pertumbuhan ekonomi Indonesia mencapai 5.2% pada kuartal kedua 2025.",
    category: "Ekonomi",
    categorySlug: "ekonomi",
    author: "Ekonomi Desk",
    date: "05 Jul 2025",
    slug: "ekonomi-indonesia-tumbuh-52-persen-kuartal-kedua",
    image: "/placeholder.svg?height=300&width=400",
    views: 1650,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("terbaru")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hasil Pencarian</h1>
          {query && (
            <p className="text-gray-600">
              Menampilkan hasil untuk: <span className="font-semibold">"{query}"</span>
            </p>
          )}
        </div>

        {/* Advanced Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari artikel, berita, atau topik..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? "Mencari..." : "Cari"}</span>
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 pt-4 border-t">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                <option value="">Semua Kategori</option>
                <option value="politik">Politik</option>
                <option value="ekonomi">Ekonomi</option>
                <option value="olahraga">Olahraga</option>
                <option value="teknologi">Teknologi</option>
                <option value="kesehatan">Kesehatan</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terpopuler">Terpopuler</option>
                <option value="relevan">Paling Relevan</option>
              </select>
            </div>
          </form>
        </div>

        {/* Search Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Ditemukan <span className="font-semibold">{searchResults.length}</span> artikel
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada hasil ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba gunakan kata kunci yang berbeda atau periksa ejaan Anda</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>Tips pencarian:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Gunakan kata kunci yang lebih umum</li>
                    <li>Periksa ejaan kata kunci</li>
                    <li>Coba gunakan sinonim</li>
                    <li>Kurangi jumlah kata kunci</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
