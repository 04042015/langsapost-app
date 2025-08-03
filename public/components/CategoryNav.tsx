"use client"

import Link from "next/link"

const categories = [
  { name: "Politik", slug: "politik" },
  { name: "Internasional", slug: "internasional" },
  { name: "Nasional", slug: "nasional" },
  { name: "Ekonomi", slug: "ekonomi" },
  { name: "Teknologi", slug: "teknologi" },
  { name: "Olahraga", slug: "olahraga" },
  { name: "Kesehatan", slug: "kesehatan" },
  { name: "Pendidikan", slug: "pendidikan" },
  { name: "Hiburan", slug: "hiburan" },
  { name: "Otomotif", slug: "otomotif" },
  { name: "Langsa", slug: "langsa" },
  { name: "Loker", slug: "loker" },
  { name: "Zodiak", slug: "zodiak" },
]

export default function CategoryNav() {
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
          <Link
            href="/artikel"
            className="text-white hover:text-red-400 font-medium whitespace-nowrap transition-colors px-3 py-1 rounded-full hover:bg-gray-800"
          >
            Semua
          </Link>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/kategori/${category.slug}`}
              className="text-white hover:text-red-400 font-medium whitespace-nowrap transition-colors px-3 py-1 rounded-full hover:bg-gray-800"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  )
}
