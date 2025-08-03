"use client"

import { useState, useEffect } from "react"
import { Download, X, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("pwa-dismissed", "true")
  }

  if (!showPrompt || localStorage.getItem("pwa-dismissed")) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Install LangsaPost</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Akses berita lebih cepat dengan menginstall aplikasi kami di perangkat Anda
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1.5 text-sm"
            >
              Nanti saja
            </button>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
