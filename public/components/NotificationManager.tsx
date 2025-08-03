"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, X } from "lucide-react"

export default function NotificationManager() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission)

      // Show prompt if permission is default and user hasn't dismissed it
      if (Notification.permission === "default" && !localStorage.getItem("notification-dismissed")) {
        setTimeout(() => setShowPrompt(true), 5000)
      }
    }
  }, [])

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      setShowPrompt(false)

      if (result === "granted") {
        // Send welcome notification
        new Notification("LangsaPost", {
          body: "Terima kasih! Anda akan mendapat notifikasi berita terkini.",
          icon: "/icon-192x192.png",
          badge: "/icon-192x192.png",
        })

        // Register for push notifications (in real app, you'd register with your push service)
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            console.log("Service Worker ready for push notifications")
          })
        }
      }
    }
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    localStorage.setItem("notification-dismissed", "true")
  }

  // Don't show if notifications aren't supported
  if (!("Notification" in window)) return null

  return (
    <>
      {/* Notification Permission Prompt */}
      {showPrompt && permission === "default" && (
        <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Aktifkan Notifikasi</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Dapatkan notifikasi untuk berita breaking news dan update terkini
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={requestPermission}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Aktifkan
                </button>
                <button
                  onClick={dismissPrompt}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-3 py-1.5 text-sm"
                >
                  Nanti saja
                </button>
              </div>
            </div>
            <button onClick={dismissPrompt} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Notification Status Indicator */}
      <div className="flex items-center space-x-2">
        {permission === "granted" ? (
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <Bell className="w-4 h-4" />
            <span className="text-xs">Notifikasi Aktif</span>
          </div>
        ) : permission === "denied" ? (
          <div className="flex items-center space-x-1 text-red-600 dark:text-red-400">
            <BellOff className="w-4 h-4" />
            <span className="text-xs">Notifikasi Diblokir</span>
          </div>
        ) : (
          <button
            onClick={requestPermission}
            className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="text-xs">Aktifkan Notifikasi</span>
          </button>
        )}
      </div>
    </>
  )
}
