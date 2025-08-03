"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import DarkModeToggle from "./DarkModeToggle"
import VoiceSearch from "./VoiceSearch"
import MultiLanguageTranslator from "./MultiLanguageTranslator"
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const handleSearch = (e: React.FormEvent) => {
  e.preventDefault()
  if (searchQuery.trim()) {
  router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
               <Image src="/logo.png" alt="LangsaPost Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-500">LangsaPost</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Portal Berita Terpercaya</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Beranda
            </Link>
            <Link href="/artikel" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Artikel
            </Link>
            <Link href="/kategori" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Kategori
            </Link>
            <Link href="/tentang" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Tentang
            </Link>
            <Link href="/kontak" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <VoiceSearch />
            <MultiLanguageTranslator />
            <DarkModeToggle />
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </form>
              <div className="flex justify-center space-x-4 mb-4">
                <MultiLanguageTranslator />
                <DarkModeToggle />
              </div>
              <Link
                href="/"
                className="text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/artikel"
                className="text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Artikel
              </Link>
              <Link
                href="/kategori"
                className="text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kategori
              </Link>
              <Link
                href="/tentang"
                className="text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link
                href="/kontak"
                className="text-gray-700 hover:text-red-500 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
