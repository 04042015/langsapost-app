'use client'

import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useEffect, useState } from 'react'

export default function KontakClient() {
  const [width, setWidth] = useState(0)

useEffect(() => {
  if (typeof window !== 'undefined') {
    setWidth(window.innerWidth)
  }
}, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami senang mendengar dari Anda. Hubungi tim redaksi LangsaPost untuk pertanyaan, saran, atau kerjasama
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email Redaksi</h3>
                    <p className="text-gray-600">redaksi@langsapost.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Telepon</h3>
                    <p className="text-gray-600">+62 641 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Merdeka No. 123
                      <br />
                      Langsa, Aceh 24411
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Jam Operasional</h3>
                    <p className="text-gray-600">
                      Senin - Jumat: 08:00 - 17:00 WIB
                      <br />
                      Sabtu: 08:00 - 12:00 WIB
                      <br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Departemen</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900">Redaksi</h3>
                  <p className="text-sm text-gray-600">redaksi@langsapost.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Iklan & Kerjasama</h3>
                  <p className="text-sm text-gray-600">iklan@langsapost.com</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Teknis & IT</h3>
                  <p className="text-sm text-gray-600">tech@langsapost.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Subjek pesan"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="redaksi">Pertanyaan Redaksi</option>
                    <option value="iklan">Iklan & Kerjasama</option>
                    <option value="teknis">Masalah Teknis</option>
                    <option value="saran">Saran & Kritik</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                    Saya ingin berlangganan newsletter LangsaPost
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pertanyaan Umum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Bagaimana cara mengirim tips berita?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Anda dapat mengirim tips berita melalui email redaksi@langsapost.com atau menggunakan form kontak di
                atas dengan kategori "Pertanyaan Redaksi".
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Apakah LangsaPost menerima kontributor?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ya, kami terbuka untuk kerjasama dengan kontributor. Silakan kirim portofolio dan proposal ke
                redaksi@langsapost.com.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Bagaimana cara memasang iklan?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Untuk informasi iklan dan kerjasama bisnis, silakan hubungi iklan@langsapost.com atau gunakan form
                kontak dengan kategori "Iklan & Kerjasama".
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Berapa lama respon dari tim redaksi?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Kami berusaha merespon setiap pesan dalam waktu 1x24 jam pada hari kerja. Untuk urusan mendesak, silakan
                hubungi nomor telepon kami.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
