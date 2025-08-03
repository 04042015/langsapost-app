"use client"

import { useState } from "react"
import { QrCode, X, Download, Share } from "lucide-react"

interface QRCodeShareProps {
  url: string
  title: string
}

export default function QRCodeShare({ url, title }: QRCodeShareProps) {
  const [showQR, setShowQR] = useState(false)

  const generateQRCode = () => {
    // Using QR Server API for simplicity
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
  }

  const downloadQR = () => {
    const link = document.createElement("a")
    link.href = generateQRCode()
    link.download = `qr-${title.replace(/\s+/g, "-").toLowerCase()}.png`
    link.click()
  }

  return (
    <>
      <button
        onClick={() => setShowQR(true)}
        className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded transition-colors"
        title="Bagikan dengan QR Code"
      >
        <QrCode className="w-4 h-4" />
      </button>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Bagikan dengan QR Code</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center">
              <div className="bg-white p-4 rounded-lg inline-block mb-4">
                <img src={generateQRCode() || "/placeholder.svg"} alt="QR Code" className="w-48 h-48" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Scan QR code ini untuk membaca artikel</p>
              <div className="flex space-x-2">
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => {
                    navigator.share?.({ title, url })
                  }}
                  className="flex-1 flex items-center justify-center space-x-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  <Share className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
