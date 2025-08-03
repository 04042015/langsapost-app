'use client'

import { Search } from "lucide-react"

export default function ArtikelClientFilter() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari artikel..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
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
          <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="terbaru">Terbaru</option>
            <option value="terpopuler">Terpopuler</option>
            <option value="terlama">Terlama</option>
          </select>
        </div>
      </div>
    </div>
  )
}
