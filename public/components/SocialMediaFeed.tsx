"use client"

import { useState, useEffect } from "react"
import { Twitter, Facebook, Instagram, ExternalLink, Heart, MessageCircle, Share } from "lucide-react"

interface SocialPost {
  id: number
  platform: "twitter" | "facebook" | "instagram"
  author: string
  handle: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  verified: boolean
}

export default function SocialMediaFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate social media API calls
    const mockPosts: SocialPost[] = [
      {
        id: 1,
        platform: "twitter",
        author: "Presiden Jokowi",
        handle: "@jokowi",
        content:
          "Infrastruktur adalah kunci kemajuan bangsa. Dengan pembangunan yang berkelanjutan, kita wujudkan Indonesia yang lebih maju dan sejahtera. #InfrastrukturIndonesia #PembangunanBerkelanjutan",
        likes: 15420,
        comments: 2850,
        shares: 8750,
        timestamp: "2 jam lalu",
        verified: true,
      },
      {
        id: 2,
        platform: "instagram",
        author: "Kementerian Kesehatan RI",
        handle: "@kemenkes_ri",
        content:
          "Tips menjaga kesehatan di musim hujan: 1) Konsumsi makanan bergizi 2) Olahraga teratur 3) Istirahat cukup 4) Jaga kebersihan. Stay healthy, Indonesia! 💪🇮🇩",
        image: "/placeholder.svg?height=200&width=300",
        likes: 8950,
        comments: 1240,
        shares: 3200,
        timestamp: "4 jam lalu",
        verified: true,
      },
      {
        id: 3,
        platform: "facebook",
        author: "Bank Indonesia",
        handle: "Bank Indonesia",
        content:
          "Ekonomi digital Indonesia terus berkembang pesat. Transaksi digital naik 45% di kuartal kedua 2025. Mari bersama membangun ekosistem keuangan digital yang inklusif dan aman.",
        likes: 5670,
        comments: 890,
        shares: 2100,
        timestamp: "6 jam lalu",
        verified: true,
      },
    ]

    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1500)
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="w-4 h-4 text-blue-400" />
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-500" />
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "border-blue-400"
      case "facebook":
        return "border-blue-600"
      case "instagram":
        return "border-pink-500"
      default:
        return "border-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="flex space-x-1">
          <Twitter className="w-4 h-4 text-blue-400" />
          <Facebook className="w-4 h-4 text-blue-600" />
          <Instagram className="w-4 h-4 text-pink-500" />
        </div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Social Media Feed</h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
          Live
        </span>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className={`border-l-4 ${getPlatformColor(post.platform)} pl-4`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  {getPlatformIcon(post.platform)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                  {post.verified && <span className="text-blue-500">✓</span>}
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.handle}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Social media post"
                    className="w-full max-w-sm h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-green-500 cursor-pointer transition-colors">
                    <Share className="w-4 h-4" />
                    <span>{post.shares.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    <span>Lihat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
          Lihat lebih banyak post →
        </button>
      </div>
    </div>
  )
}
