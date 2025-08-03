import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Eye } from "lucide-react"

interface Article {
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
  featured?: boolean
}

interface ArticleCardProps {
  article: Article
  variant?: "default" | "featured" | "compact"
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="md:flex">
          <div className="md:w-1/2">
            <Link href={`/artikel/${article.slug}`}>
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
          <div className="md:w-1/2 p-6">
            <div className="flex items-center space-x-2 mb-3">
              <Link
                href={`/kategori/${article.categorySlug}`}
                className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full hover:bg-gray-800 transition-colors"
              >
                {article.category}
              </Link>
              <span className="text-red-500 font-semibold text-sm">FEATURED</span>
            </div>
            <Link href={`/artikel/${article.slug}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-red-500 cursor-pointer transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-24 h-20 flex-shrink-0">
            <Link href={`/artikel/${article.slug}`}>
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={96}
                height={80}
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
          <div className="flex-1 p-3">
            <Link
              href={`/kategori/${article.categorySlug}`}
              className="inline-block px-2 py-0.5 bg-black text-white text-xs font-medium rounded mb-1"
            >
              {article.category}
            </Link>
            <Link href={`/artikel/${article.slug}`}>
              <h3 className="font-bold text-sm text-gray-900 mb-1 hover:text-red-500 transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{article.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <Link href={`/artikel/${article.slug}`}>
          <Image
            src={article.image || "/placeholder.svg"}
            alt={article.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Link
          href={`/kategori/${article.categorySlug}`}
          className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-medium rounded-full hover:bg-gray-800 transition-colors"
        >
          {article.category}
        </Link>
      </div>
      <div className="p-4">
        <Link href={`/artikel/${article.slug}`}>
          <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-red-500 cursor-pointer transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{article.date}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{article.views}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
