import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { categories } from "@/lib/categories"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 relative">
                <Image src="/logo.png" alt="LangsaPost Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">LangsaPost</h3>
                <p className="text-gray-400 text-sm">Portal Berita Terpercaya Indonesia</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Menyajikan berita terkini dan terpercaya dari berbagai bidang untuk masyarakat Indonesia. Komitmen kami
              adalah memberikan informasi yang akurat, berimbang, dan dapat dipercaya.
            </p>
            <div className="flex space-x-4">
  <a
    href="https://www.facebook.com/share/1CBZwUcfhN/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook LangsaPost"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Facebook className="w-5 h-5" />
  </a>
  <a
    href="https://x.com/langsapost"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter (X) LangsaPost"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Twitter className="w-5 h-5" />
  </a>
  <a
    href="https://www.instagram.com/langsapost.id?igsh=MXh3dGNsbnJ3eGlkMQ=="
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram LangsaPost"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Instagram className="w-5 h-5" />
  </a>
  <a
    href="https://www.youtube.com/channel/UCm18EB9_UZb44GWLwaN1X4g"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube LangsaPost"
    className="text-gray-400 hover:text-white transition-colors"
  >
    <Youtube className="w-5 h-5" />
  </a>
</div>

          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Kategori</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/kategori/${category.slug}`} className="hover:text-white transition-colors text-sm">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Kontak & Info</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>redaksi@langsapost.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+62 641 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Langsa, Aceh, Indonesia</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-medium mb-2">Halaman</h5>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>
                  <Link href="/tentang" className="hover:text-white transition-colors">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/kontak" className="hover:text-white transition-colors">
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 LangsaPost. Semua hak cipta dilindungi undang-undang.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
