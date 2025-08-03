"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, Volume2 } from "lucide-react"

interface TextToSpeechProps {
  text: string
  title?: string
}

export default function TextToSpeech({ text, title = "Artikel" }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setIsSupported("speechSynthesis" in window)

    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis
      const utteranceInstance = new SpeechSynthesisUtterance()

      // Clean HTML tags from text
      const cleanText = text
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
      utteranceInstance.text = cleanText
      utteranceInstance.lang = "id-ID"
      utteranceInstance.rate = 0.9
      utteranceInstance.pitch = 1

      utteranceInstance.onstart = () => {
        setIsPlaying(true)
        setIsPaused(false)
      }

      utteranceInstance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
      }

      utteranceInstance.onerror = () => {
        setIsPlaying(false)
        setIsPaused(false)
      }

      setUtterance(utteranceInstance)

      return () => {
        synth.cancel()
      }
    }
  }, [text])

  const handlePlay = () => {
    if (!utterance || !isSupported) return

    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
    } else {
      window.speechSynthesis.speak(utterance)
    }
  }

  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  if (!isSupported) return null

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-red-500" />
          <span className="font-medium text-gray-900 dark:text-white">Dengarkan {title}</span>
        </div>
        <div className="flex items-center space-x-2">
          {!isPlaying && !isPaused && (
            <button
              onClick={handlePlay}
              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Putar</span>
            </button>
          )}

          {isPlaying && (
            <button
              onClick={handlePause}
              className="flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span>Jeda</span>
            </button>
          )}

          {isPaused && (
            <button
              onClick={handlePlay}
              className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Lanjut</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="flex items-center space-x-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
            >
              <Square className="w-4 h-4" />
              <span>Stop</span>
            </button>
          )}
        </div>
      </div>

      {isPlaying && (
        <div className="mt-3 flex items-center space-x-2">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-4 bg-red-500 rounded animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">Sedang memutar...</span>
        </div>
      )}
    </div>
  )
}
