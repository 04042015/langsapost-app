"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from "lucide-react"

interface VideoPlayerProps {
  src: string
  title: string
  thumbnail?: string
  subtitles?: string
}

export default function VideoPlayer({ src, title, thumbnail, subtitles }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (Number.parseFloat(e.target.value) / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = Number.parseFloat(e.target.value) / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!isFullscreen) {
      video.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
    setShowSettings(false)
  }

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(duration, video.currentTime + seconds))
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full aspect-video"
        poster={thumbnail}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <source src={src} type="video/mp4" />
        {subtitles && <track kind="subtitles" src={subtitles} srcLang="id" label="Bahasa Indonesia" />}
        Browser Anda tidak mendukung video HTML5.
      </video>

      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <Play className="w-8 h-8 text-gray-900 ml-1" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay} className="text-white hover:text-gray-300 transition-colors">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button onClick={() => skip(-10)} className="text-white hover:text-gray-300 transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>

              <button onClick={() => skip(10)} className="text-white hover:text-gray-300 transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="text-white hover:text-gray-300 transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg p-2 min-w-32">
                    <div className="text-white text-sm mb-2">Kecepatan</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackSpeed(speed)}
                        className={`block w-full text-left px-2 py-1 text-sm rounded transition-colors ${
                          playbackSpeed === speed ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Title */}
      <div className="absolute top-4 left-4 right-4">
        <h3 className="text-white font-semibold text-lg drop-shadow-lg">{title}</h3>
      </div>
    </div>
  )
}
