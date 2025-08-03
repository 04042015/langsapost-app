import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import ArticleCard from "@/components/ArticleCard"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Eye, Share2, Facebook, Twitter, PhoneIcon as Whatsapp } from "lucide-react"
import { notFound } from "next/navigation"
import ReadingProgress from "@/components/ReadingProgress"
import CommentSection from "@/components/CommentSection"
import TextToSpeech from "@/components/TextToSpeech"
import BookmarkButton from "@/components/BookmarkButton"
import QRCodeShare from "@/components/QRCodeShare"

// Sample article data
const article = {
  id: 1,
  title: "Presiden Jokowi Resmikan Infrastruktur Baru di Aceh yang Akan Mengubah Perekonomian Daerah",
  excerpt:
    "Presiden Joko Widodo meresmikan pembangunan infrastruktur strategis di Provinsi Aceh yang diharapkan dapat meningkatkan perekonomian daerah dan kesejahteraan masyarakat.",
  category: "Politik",
  categorySlug: "politik",
  author: "Ahmad Rizki",
  date: "08 Jul 2025",
  slug: "presiden-jokowi-resmikan-infrastruktur-baru-di-aceh",
  image: "/placeholder.svg?height=500&width=800",
  views: 2850,
  content: `
    <p>LANGSA - Presiden Joko Widodo (Jokowi) secara resmi meresmikan pembangunan infrastruktur strategis di Provinsi Aceh pada Senin (8/7/2025). Infrastruktur yang diresmikan meliputi jalan tol, pelabuhan, dan bandara yang diharapkan dapat menjadi katalis pertumbuhan ekonomi di wilayah ujung barat Indonesia ini.</p>

    <p>Dalam sambutannya, Presiden Jokowi menekankan pentingnya konektivitas untuk mendorong pertumbuhan ekonomi daerah. "Infrastruktur adalah fondasi pembangunan. Dengan infrastruktur yang baik, kita bisa membuka akses, menurunkan biaya logistik, dan meningkatkan daya saing," ujar Presiden di hadapan ribuan masyarakat Aceh.</p>

    <h3>Proyek Infrastruktur Strategis</h3>
    <p>Proyek infrastruktur yang diresmikan terdiri dari beberapa komponen utama:</p>
    <ul>
      <li><strong>Jalan Tol Banda Aceh-Langsa</strong> sepanjang 185 kilometer dengan investasi Rp 15 triliun</li>
      <li><strong>Pelabuhan Malahayati</strong> yang diperluas dengan kapasitas 2 juta TEUs per tahun</li>
      <li><strong>Bandara Sultan Iskandar Muda</strong> yang ditingkatkan menjadi bandara internasional</li>
    </ul>

    <p>Gubernur Aceh, Nova Iriansyah, menyambut baik peresmian infrastruktur ini. "Ini adalah momentum bersejarah bagi Aceh. Infrastruktur ini akan membuka peluang investasi dan lapangan kerja baru bagi masyarakat Aceh," kata Nova.</p>

    <h3>Dampak Ekonomi yang Diharapkan</h3>
    <p>Menurut Kementerian Pekerjaan Umum dan Perumahan Rakyat (PUPR), pembangunan infrastruktur ini diproyeksikan akan:</p>
    <ul>
      <li>Meningkatkan PDRB Aceh hingga 7% per tahun</li>
      <li>Menciptakan 50.000 lapangan kerja langsung dan tidak langsung</li>
      <li>Menurunkan biaya logistik hingga 15%</li>
      <li>Meningkatkan kunjungan wisatawan hingga 30%</li>
    </ul>

    <p>Pembangunan infrastruktur ini juga diharapkan dapat memperkuat posisi Aceh sebagai gerbang Indonesia di kawasan Selat Malaka, salah satu jalur perdagangan tersibuk di dunia.</p>

    <h3>Komitmen Pemerintah</h3>
    <p>Presiden Jokowi menegaskan komitmen pemerintah untuk terus membangun infrastruktur di seluruh Indonesia, termasuk di daerah-daerah terdepan seperti Aceh. "Pembangunan infrastruktur tidak boleh berhenti. Kita harus terus bergerak maju untuk menciptakan Indonesia yang lebih maju dan sejahtera," tegas Presiden.</p>

    <p>Dengan peresmian infrastruktur ini, diharapkan Aceh dapat menjadi pusat pertumbuhan ekonomi baru di kawasan barat Indonesia dan meningkatkan kesejahteraan masyarakat setempat.</p>
  `,
  tags: ["Jokowi", "Infrastruktur", "Aceh", "Ekonomi", "Pembangunan"],
}

// Related articles
const relatedArticles = [
  {
    id: 2,
    title: "Ekonomi Indonesia Tumbuh 5.2% di Kuartal Kedua",
    excerpt: "Badan Pusat Statistik melaporkan pertumbuhan ekonomi Indonesia mencapai 5.2% pada kuartal kedua 2025.",
    category: "Ekonomi",
    categorySlug: "ekonomi",
    author: "Ekonomi Desk",
    date: "05 Jul 2025",
    slug: "ekonomi-indonesia-tumbuh-52-persen-kuartal-kedua",
    image: "/placeholder.svg?height=200&width=300",
    views: 1650,
  },
  // Add more related articles...
]

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // In real app, fetch article by slug
  if (params.slug !== article.slug) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgress />
      <Header />
      <CategoryNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-red-500">
                Beranda
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/kategori/${article.categorySlug}`} className="hover:text-red-500">
                {article.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 truncate">{article.title}</li>
          </ol>
        </nav>

        <TextToSpeech text={article.content} title={article.title} />

        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {/* Article Header */}
          <div className="p-6 md:p-8">
            <div className="mb-4">
              <Link
                href={`/kategori/${article.categorySlug}`}
                className="inline-block px-3 py-1 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                {article.category}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>
                  Oleh <strong className="text-gray-700">{article.author}</strong>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b">
              <span className="text-sm font-medium text-gray-700">Bagikan:</span>
              <div className="flex space-x-2">
                <BookmarkButton articleId={article.id} articleTitle={article.title} articleSlug={article.slug} />
                <QRCodeShare url={`https://langsapost.vercel.app/artikel/${article.slug}`} title={article.title} />
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                  <Whatsapp className="w-4 h-4" />
                </button>
                <button className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="px-6 md:px-8 mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={500}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className="px-6 md:px-8 pb-8">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Tags */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Comment Section */}
        <CommentSection />

        {/* Related Articles */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
