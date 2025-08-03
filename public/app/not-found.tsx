"use client"
  
import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-red-500">404</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL salah.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>

          <Link
            href="/artikel"
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Jelajahi Artikel</span>
          </Link>

          <button
            onClick={() => router.back()}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-3 px-6 transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Sebelumnya</span>
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Atau coba halaman populer:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="/kategori/politik"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              Politik
            </Link>
            <Link
              href="/kategori/ekonomi"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              Ekonomi
            </Link>
            <Link
              href="/kategori/olahraga"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              Olahraga
            </Link>
            <Link
              href="/kategori/teknologi"
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
            >
              Teknologi
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
