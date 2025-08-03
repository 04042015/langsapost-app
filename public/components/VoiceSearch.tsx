"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
  }, [])

  const startListening = () => {
    if (!isSupported) return

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "id-ID"

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setTranscript(transcript)
      // Redirect to search with voice query
      window.location.href = `/search?q=${encodeURIComponent(transcript)}`
    }

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
  }

  const stopListening = () => {
    setIsListening(false)
  }

  if (!isSupported) return null

  return (
    <div className="relative">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`p-2 rounded-lg transition-colors ${
          isListening
            ? "bg-red-500 text-white animate-pulse"
            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
        }`}
        title={isListening ? "Stop voice search" : "Start voice search"}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </button>

      {isListening && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Mendengarkan...</span>
          </div>
        </div>
      )}
    </div>
  )
}
