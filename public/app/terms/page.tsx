import Header from "@/components/Header"
import CategoryNav from "@/components/CategoryNav"
import Footer from "@/components/Footer"
import { FileText, AlertTriangle, Scale, Users } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CategoryNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Syarat & Ketentuan</h1>
          <p className="text-gray-600">Terakhir diperbarui: 8 Juli 2025</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            Selamat datang di LangsaPost. Dengan mengakses dan menggunakan website ini, Anda menyetujui untuk terikat
            oleh syarat dan ketentuan berikut.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Scale className="w-6 h-6 text-red-500 mr-2" />
            Penerimaan Syarat
          </h2>
          <p className="mb-6">
            Dengan menggunakan website LangsaPost, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui
            untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan syarat ini, harap tidak
            menggunakan website kami.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Penggunaan Website</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Penggunaan yang Diizinkan</h3>
          <ul className="mb-4">
            <li>Membaca dan mengakses konten berita</li>
            <li>Berbagi artikel melalui media sosial</li>
            <li>Berlangganan newsletter</li>
            <li>Memberikan komentar yang konstruktif</li>
            <li>Menghubungi redaksi untuk keperluan jurnalistik</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Penggunaan yang Dilarang</h3>
          <ul className="mb-6">
            <li>Menyalin atau mendistribusikan konten tanpa izin</li>
            <li>Menggunakan konten untuk tujuan komersial tanpa lisensi</li>
            <li>Mengirim spam atau konten berbahaya</li>
            <li>Melakukan aktivitas yang dapat merusak website</li>
            <li>Menyebarkan informasi palsu atau menyesatkan</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="w-6 h-6 text-red-500 mr-2" />
            Komentar dan Konten Pengguna
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Pedoman Komentar</h3>
          <p className="mb-4">Saat memberikan komentar, Anda setuju untuk:</p>
          <ul className="mb-4">
            <li>Menggunakan bahasa yang sopan dan tidak menyinggung</li>
            <li>Tidak menyebarkan ujaran kebencian atau diskriminasi</li>
            <li>Tidak melakukan spam atau promosi berlebihan</li>
            <li>Menghormati pendapat pengguna lain</li>
            <li>Tidak membagikan informasi pribadi orang lain</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">Moderasi</h3>
          <p className="mb-6">
            Kami berhak untuk memoderasi, mengedit, atau menghapus komentar yang melanggar pedoman ini tanpa
            pemberitahuan sebelumnya. Pengguna yang berulang kali melanggar dapat diblokir dari website.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hak Kekayaan Intelektual</h2>
          <p className="mb-4">
            Semua konten di website LangsaPost, termasuk teks, gambar, logo, dan desain, dilindungi oleh hak cipta dan
            merupakan milik LangsaPost atau pemberi lisensi kami.
          </p>
          <ul className="mb-6">
            <li>Anda dapat membaca dan berbagi artikel untuk penggunaan pribadi</li>
            <li>Kutipan singkat diizinkan dengan mencantumkan sumber</li>
            <li>Penggunaan komersial memerlukan izin tertulis</li>
            <li>Logo dan merek dagang tidak boleh digunakan tanpa izin</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Akurasi Informasi</h2>
          <p className="mb-6">
            Kami berusaha menyajikan informasi yang akurat dan terkini. Namun, kami tidak dapat menjamin keakuratan,
            kelengkapan, atau ketepatan waktu semua informasi. Pengguna disarankan untuk memverifikasi informasi penting
            dari sumber lain.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tautan Eksternal</h2>
          <p className="mb-6">
            Website kami mungkin berisi tautan ke website pihak ketiga. Kami tidak bertanggung jawab atas konten atau
            kebijakan privasi website tersebut. Penggunaan website pihak ketiga adalah risiko Anda sendiri.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pembatasan Tanggung Jawab</h2>
          <p className="mb-6">
            LangsaPost tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial
            yang timbul dari penggunaan website ini. Penggunaan website adalah risiko Anda sendiri.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perubahan Syarat</h2>
          <p className="mb-6">
            Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah diposting di
            website. Penggunaan berkelanjutan website setelah perubahan menandakan penerimaan syarat yang baru.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hukum yang Berlaku</h2>
          <p className="mb-6">
            Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui
            pengadilan yang berwenang di Indonesia.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              Pelanggaran Syarat
            </h2>
            <p className="mb-4">Pelanggaran terhadap syarat dan ketentuan ini dapat mengakibatkan:</p>
            <ul className="space-y-1">
              <li>• Peringatan atau teguran</li>
              <li>• Penghapusan konten yang melanggar</li>
              <li>• Pemblokiran akses sementara atau permanen</li>
              <li>• Tindakan hukum jika diperlukan</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontak</h2>
            <p className="mb-4">
              Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami:
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Email:</strong> legal@langsapost.com
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
