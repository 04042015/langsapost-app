'use client'

import { useEffect } from 'react'
import Header from "@/components/Header"
import DynamicClientWidgets from './_components/DynamicClientWidgets'
import CategoryNav from "@/components/CategoryNav"
import Link from "next/link"
import LiveBreakingNews from "@/components/LiveBreakingNews"
import WeatherWidget from "@/components/WeatherWidget"
// import LivePolls from "@/components/LivePolls"
import AIRecommendations from "@/components/AIRecommendations"
import SocialMediaFeed from "@/components/SocialMediaFeed"
// import ReadingAchievements from "@/components/ReadingAchievements"
import InteractiveChart from "@/components/InteractiveChart"
import ArticleCard from "@/components/ArticleCard"
import Footer from "@/components/Footer"
// import PWAInstallPrompt from "@/components/PWAInstallPrompt"
import LiveChat from "@/components/SmartChatbot"
import TrendingTopics from "@/components/TrendingTopics"

const articles = [
  {
    id: 1,
    title: "Presiden Jokowi Resmikan Infrastruktur Baru di Aceh",
    excerpt: "Presiden Joko Widodo meresmikan pembangunan infrastruktur strategis di Provinsi Aceh yang diharapkan dapat meningkatkan perekonomian daerah dan kesejahteraan masyarakat.",
    category: "Politik",
    categorySlug: "politik",
    author: "Ahmad Rizki",
    date: "08 Jul 2025",
    slug: "presiden-jokowi-resmikan-infrastruktur-baru-di-aceh",
    image: "/placeholder.svg?height=400&width=600",
    views: 2850,
    featured: true,
  },
  {
    id: 2,
    title: "5 Tips Agar Imun Tubuh Tetap Kuat Tanpa Obat",
    excerpt: "Sistem imun yang kuat adalah pertahanan utama tubuh dari penyakit. Berikut cara alami meningkatkan imunitas tubuh Anda tanpa bergantung pada obat-obatan.",
    category: "Kesehatan",
    categorySlug: "kesehatan",
    author: "Dr. Sarah Amelia",
    date: "07 Jul 2025",
    slug: "5-tips-agar-imun-tubuh-tetap-kuat-tanpa-obat",
    image: "/placeholder.svg?height=300&width=400",
    views: 2100,
  },
  {
    id: 3,
    title: "Perkembangan Teknologi AI di Indonesia 2025",
    excerpt: "Artificial Intelligence semakin berkembang pesat di Indonesia. Berbagai sektor mulai mengadopsi teknologi ini untuk meningkatkan efisiensi dan produktivitas.",
    category: "Teknologi",
    categorySlug: "teknologi",
    author: "Tech Editor",
    date: "06 Jul 2025",
    slug: "perkembangan-teknologi-ai-di-indonesia-2025",
    image: "/placeholder.svg?height=300&width=400",
    views: 1890,
  },
  {
    id: 4,
    title: "Ekonomi Indonesia Tumbuh 5.2% di Kuartal Kedua",
    excerpt: "Badan Pusat Statistik melaporkan pertumbuhan ekonomi Indonesia mencapai 5.2% pada kuartal kedua 2025, didorong oleh konsum domestik yang kuat.",
    category: "Ekonomi",
    categorySlug: "ekonomi",
    author: "Ekonomi Desk",
    date: "05 Jul 2025",
    slug: "ekonomi-indonesia-tumbuh-52-persen-kuartal-kedua",
    image: "/placeholder.svg?height=300&width=400",
    views: 1650,
  },
  {
    id: 5,
    title: "Timnas Indonesia Lolos ke Semifinal Piala Asia",
    excerpt: "Tim nasional sepak bola Indonesia berhasil melaju ke semifinal Piala Asia setelah mengalahkan Thailand dengan skor 2-1 dalam pertandingan yang dramatis.",
    category: "Olahraga",
    categorySlug: "olahraga",
    author: "Sports Desk",
    date: "04 Jul 2025",
    slug: "timnas-indonesia-lolos-semifinal-piala-asia",
    image: "/placeholder.svg?height=300&width=400",
    views: 3200,
  },
  {
    id: 6,
    title: "Festival Budaya Langsa Menarik Ribuan Wisatawan",
    excerpt: "Festival Budaya Langsa 2025 berhasil menarik ribuan wisatawan domestik dan mancanegara untuk menyaksikan pertunjukan seni dan budaya tradisional Aceh.",
    category: "Langsa",
    categorySlug: "langsa",
    author: "Langsa Reporter",
    date: "03 Jul 2025",
    slug: "festival-budaya-langsa-menarik-ribuan-wisatawan",
    image: "/placeholder.svg?height=300&width=400",
    views: 1420,
  },
]

export default function HomePage() {
  const featuredArticle = articles.find((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />
      <LiveBreakingNews />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {featuredArticle && (
          <div className="mb-12">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Berita Terkini</h2>
                <Link href="/artikel" className="text-red-500 hover:text-red-600 font-medium flex items-center">
                  Lihat Semua →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularArticles.slice(0, 6).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* <section>
              <InteractiveChart />
            </section>

            <section>
              <LivePolls />
            </section> */}

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Populer</h2>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="space-y-4">
                  {articles
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((article, index) => (
                      <div
                        key={article.id}
                        className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex-shrink-0">
                          <span className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full font-bold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <Link href={`/artikel/${article.slug}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-red-500 transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                            <span>{article.category}</span>
                            <span>•</span>
                            <span>{article.views.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
             <WeatherWidget />
             <TrendingTopics />
            {/* <AIRecommendations /> */}
             <SocialMediaFeed />
            {/* <ReadingAchievements /> */}
          </div>
        </div>

        <section className="mt-16 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Berlangganan Newsletter</h2>
          <p className="mb-6 opacity-90">Dapatkan berita terkini langsung di email Anda setiap hari</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-r-lg font-medium transition-colors">
              Berlangganan
            </button>
          </div>
        </section>
      </main>

      {/* <PWAInstallPrompt /> */}
       <LiveChat />
    </div>
  )
}
