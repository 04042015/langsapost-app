"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Hash } from "lucide-react"
import Link from "next/link"

interface TrendingTopic {
  id: number
  topic: string
  count: number
  change: "up" | "down" | "same"
}

export default function TrendingTopics() {
  const [topics, setTopics] = useState<TrendingTopic[]>([])

  useEffect(() => {
    // Simulate trending topics data
    const trendingData: TrendingTopic[] = [
      { id: 1, topic: "Infrastruktur Aceh", count: 2850, change: "up" },
      { id: 2, topic: "Ekonomi Indonesia", count: 1920, change: "up" },
      { id: 3, topic: "Timnas Indonesia", count: 1650, change: "down" },
      { id: 4, topic: "Teknologi AI", count: 1420, change: "up" },
      { id: 5, topic: "Festival Langsa", count: 980, change: "same" },
    ]

    setTopics(trendingData)
  }, [])

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <span className="text-green-500">↗</span>
      case "down":
        return <span className="text-red-500">↘</span>
      default:
        return <span className="text-gray-500">→</span>
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-red-500" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Trending Topics</h3>
      </div>

      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900 text-red-500 rounded-full font-bold text-sm">
                {index + 1}
              </span>
              <div>
                <Link
                  href={`/search?q=${encodeURIComponent(topic.topic)}`}
                  className="font-medium text-gray-900 dark:text-white hover:text-red-500 transition-colors"
                >
                  <Hash className="w-4 h-4 inline mr-1" />
                  {topic.topic}
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">{topic.count.toLocaleString()} pembahasan</p>
              </div>
            </div>
            <div className="text-right">{getChangeIcon(topic.change)}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/trending" className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors">
          Lihat semua trending topics →
        </Link>
      </div>
    </div>
  )
}
