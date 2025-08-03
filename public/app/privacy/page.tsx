'use client';

import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import { Shield, Eye, Cookie, Mail } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
          <p className="text-gray-600">Terakhir diperbarui: 8 Juli 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            LangsaPost berkomitmen untuk melindungi privasi dan keamanan data pribadi pengunjung website kami. Kebijakan
            privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Eye className="w-6 h-6 text-red-500 mr-2" />
            Informasi yang Kami Kumpulkan
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Informasi yang Anda Berikan</h3>
          <ul className="mb-6">
            <li>Nama dan alamat email saat berlangganan newsletter</li>
            <li>Komentar dan feedback yang Anda kirimkan</li>
            <li>Informasi kontak saat menghubungi kami</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Informasi yang Dikumpulkan Otomatis</h3>
          <ul className="mb-6">
            <li>Alamat IP dan informasi perangkat</li>
            <li>Data penggunaan website (halaman yang dikunjungi, waktu kunjungan)</li>
            <li>Informasi browser dan sistem operasi</li>
            <li>Data analytics untuk meningkatkan layanan</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Cookie className="w-6 h-6 text-red-500 mr-2" />
            Penggunaan Cookies
          </h2>
          <p className="mb-4">
            Kami menggunakan cookies untuk meningkatkan pengalaman browsing Anda. Cookies membantu kami:
          </p>
          <ul className="mb-6">
            <li>Mengingat preferensi Anda (seperti mode gelap/terang)</li>
            <li>Menganalisis traffic website</li>
            <li>Menyediakan konten yang relevan</li>
            <li>Meningkatkan keamanan website</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bagaimana Kami Menggunakan Informasi</h2>
          <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
          <ul className="mb-6">
            <li>Menyediakan dan meningkatkan layanan website</li>
            <li>Mengirim newsletter dan update berita</li>
            <li>Merespons pertanyaan dan feedback</li>
            <li>Menganalisis penggunaan website untuk perbaikan</li>
            <li>Mencegah spam dan aktivitas berbahaya</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keamanan Data</h2>
          <p className="mb-6">
            Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses,
            penggunaan, atau pengungkapan yang tidak sah. Namun, tidak ada metode transmisi melalui internet yang 100%
            aman.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Berbagi Informasi</h2>
          <p className="mb-4">
            Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga, kecuali
            dalam situasi berikut:
          </p>
          <ul className="mb-6">
            <li>Dengan persetujuan eksplisit dari Anda</li>
            <li>Untuk mematuhi hukum atau proses hukum</li>
            <li>Untuk melindungi hak dan keamanan kami atau pengguna lain</li>
            <li>Dengan penyedia layanan terpercaya yang membantu operasional website</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hak Anda</h2>
          <p className="mb-4">Anda memiliki hak untuk:</p>
          <ul className="mb-6">
            <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data pribadi Anda</li>
            <li>Menolak atau membatasi pemrosesan data</li>
            <li>Berhenti berlangganan newsletter kapan saja</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Layanan Pihak Ketiga</h2>
          <p className="mb-6">
            Website kami mungkin menggunakan layanan pihak ketiga seperti Google Analytics, media sosial, dan layanan
            iklan. Layanan ini memiliki kebijakan privasi mereka sendiri yang terpisah dari kami.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perubahan Kebijakan</h2>
          <p className="mb-6">
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan diposting di halaman ini
            dengan tanggal pembaruan yang baru. Kami mendorong Anda untuk meninjau kebijakan ini secara berkala.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Mail className="w-6 h-6 text-red-500 mr-2" />
              Hubungi Kami
            </h2>
            <p className="mb-4">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak-hak Anda, silakan
              hubungi kami:
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong> privacy@langsapost.com
              </li>
              <li>
                <strong>Telepon:</strong> +62 641 123 4567
              </li>
              <li>
                <strong>Alamat:</strong> Jl. Merdeka No. 123, Langsa, Aceh 24411
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
