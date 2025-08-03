"use client"

import { useState } from "react"
import { Globe, ChevronDown, Check } from "lucide-react"

const languages = [
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
]

export default function MultiLanguageTranslator() {
  const [currentLang, setCurrentLang] = useState("id")
  const [isOpen, setIsOpen] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === currentLang) return

    setIsTranslating(true)
    setIsOpen(false)

    // Simulate translation process
    setTimeout(() => {
      setCurrentLang(langCode)
      setIsTranslating(false)

      // In real app, this would trigger actual translation
      if (langCode !== "id") {
        // Show translation notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("LangsaPost", {
            body: `Halaman telah diterjemahkan ke ${languages.find((l) => l.code === langCode)?.name}`,
            icon: "/icon-192x192.png",
          })
        }
      }
    }, 2000)
  }

  const currentLanguage = languages.find((lang) => lang.code === currentLang)

  return (
    <div className="relative">
      {/* Translation Loading Overlay */}
      {isTranslating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4">
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Menerjemahkan Halaman</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Menggunakan AI untuk menerjemahkan konten ke {languages.find((l) => l.code === currentLang)?.name}...
              </p>
              <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentLanguage?.flag} {currentLanguage?.name}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-2 border-b border-gray-100 dark:border-gray-700">
                Pilih Bahasa
              </div>
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                    currentLang === language.code
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                  {currentLang === language.code && <Check className="w-4 h-4 text-blue-500" />}
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Powered by AI Translation
                <br />
                <span className="text-blue-500">Beta Feature</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
