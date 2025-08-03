"use client"

import { useState, useEffect } from "react"
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react"

interface ChartData {
  label: string
  value: number
  change: number
  color: string
}

export default function InteractiveChart() {
  const [activeTab, setActiveTab] = useState<"views" | "engagement" | "trending">("views")
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    const generateData = () => {
      switch (activeTab) {
        case "views":
          return [
            { label: "Politik", value: 15420, change: 12.5, color: "bg-red-500" },
            { label: "Ekonomi", value: 12350, change: 8.2, color: "bg-blue-500" },
            { label: "Olahraga", value: 18750, change: -3.1, color: "bg-green-500" },
            { label: "Teknologi", value: 9840, change: 25.7, color: "bg-purple-500" },
            { label: "Kesehatan", value: 11200, change: 15.3, color: "bg-yellow-500" },
          ]
        case "engagement":
          return [
            { label: "Komentar", value: 2840, change: 18.5, color: "bg-indigo-500" },
            { label: "Share", value: 1950, change: 22.1, color: "bg-pink-500" },
            { label: "Bookmark", value: 3200, change: 9.8, color: "bg-orange-500" },
            { label: "Like", value: 5670, change: 14.2, color: "bg-teal-500" },
          ]
        case "trending":
          return [
            { label: "Infrastruktur", value: 8950, change: 45.2, color: "bg-red-600" },
            { label: "AI Technology", value: 6780, change: 38.7, color: "bg-blue-600" },
            { label: "Ekonomi Digital", value: 5420, change: 28.3, color: "bg-green-600" },
            { label: "Startup", value: 4890, change: 19.5, color: "bg-purple-600" },
          ]
      }
    }

    setChartData(generateData())
  }, [activeTab])

  const maxValue = Math.max(...chartData.map((item) => item.value))

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Analytics Dashboard</h3>
        </div>
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("views")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "views"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Views
          </button>
          <button
            onClick={() => setActiveTab("engagement")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "engagement"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Engagement
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTab === "trending"
                ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Trending
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={item.label} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.value.toLocaleString()}
                </span>
                <div
                  className={`flex items-center space-x-1 text-xs font-medium ${
                    item.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out group-hover:opacity-80`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Activity className="w-4 h-4" />
            <span>Real-time data</span>
          </div>
          <span>Last updated: 2 min ago</span>
        </div>
      </div>
    </div>
  )
}
