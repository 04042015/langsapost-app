import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import { notFound } from "next/navigation"

const categories = {
  politik: { name: "Politik", description: "Berita politik terkini dari Indonesia dan dunia" },
  ekonomi: { name: "Ekonomi", description: "Informasi ekonomi, bisnis, dan keuangan" },
  olahraga: { name: "Olahraga", description: "Berita olahraga dan hasil pertandingan terbaru" },
  teknologi: { name: "Teknologi", description: "Perkembangan teknologi dan inovasi terbaru" },
  kesehatan: { name: "Kesehatan", description: "Tips kesehatan dan informasi medis terpercaya" },
  // Add more categories...
}

// Sample articles for category
const categoryArticles = [
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
  // Add more articles...
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{category.description}</p>
          <div className="mt-6">
            <span className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {categoryArticles.length} Artikel
            </span>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Muat Lebih Banyak
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
