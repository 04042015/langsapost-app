"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trophy, Star, Target, BookOpen, Clock, Award } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedAt?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

export default function ReadingAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [showNewAchievement, setShowNewAchievement] = useState<Achievement | null>(null)

  useEffect(() => {
    // Load achievements from localStorage
    const savedStats = JSON.parse(localStorage.getItem("readingStats") || "{}")
    const articlesRead = savedStats.articlesRead || 0
    const timeSpent = savedStats.timeSpent || 0
    const categoriesExplored = savedStats.categoriesExplored || 0
    const commentsPosted = savedStats.commentsPosted || 0

    const achievementsList: Achievement[] = [
      {
        id: "first_article",
        title: "Pembaca Pemula",
        description: "Baca artikel pertama Anda",
        icon: <BookOpen className="w-6 h-6" />,
        progress: Math.min(articlesRead, 1),
        maxProgress: 1,
        unlocked: articlesRead >= 1,
        rarity: "common",
      },
      {
        id: "article_explorer",
        title: "Penjelajah Berita",
        description: "Baca 10 artikel",
        icon: <Target className="w-6 h-6" />,
        progress: Math.min(articlesRead, 10),
        maxProgress: 10,
        unlocked: articlesRead >= 10,
        rarity: "common",
      },
      {
        id: "news_addict",
        title: "Pecandu Berita",
        description: "Baca 50 artikel",
        icon: <Star className="w-6 h-6" />,
        progress: Math.min(articlesRead, 50),
        maxProgress: 50,
        unlocked: articlesRead >= 50,
        rarity: "rare",
      },
      {
        id: "time_reader",
        title: "Pembaca Setia",
        description: "Habiskan 60 menit membaca",
        icon: <Clock className="w-6 h-6" />,
        progress: Math.min(timeSpent, 60),
        maxProgress: 60,
        unlocked: timeSpent >= 60,
        rarity: "rare",
      },
      {
        id: "category_master",
        title: "Master Kategori",
        description: "Jelajahi 5 kategori berbeda",
        icon: <Award className="w-6 h-6" />,
        progress: Math.min(categoriesExplored, 5),
        maxProgress: 5,
        unlocked: categoriesExplored >= 5,
        rarity: "epic",
      },
      {
        id: "news_legend",
        title: "Legenda Berita",
        description: "Baca 100 artikel",
        icon: <Trophy className="w-6 h-6" />,
        progress: Math.min(articlesRead, 100),
        maxProgress: 100,
        unlocked: articlesRead >= 100,
        rarity: "legendary",
      },
    ]

    setAchievements(achievementsList)

    // Calculate total points and level
    const points = achievementsList.reduce((total, achievement) => {
      if (achievement.unlocked) {
        const rarityPoints = {
          common: 10,
          rare: 25,
          epic: 50,
          legendary: 100,
        }
        return total + rarityPoints[achievement.rarity]
      }
      return total
    }, 0)

    setTotalPoints(points)
    setLevel(Math.floor(points / 50) + 1)

    // Check for new achievements
    const lastCheck = localStorage.getItem("lastAchievementCheck")
    const newUnlocked = achievementsList.find(
      (achievement) => achievement.unlocked && (!lastCheck || achievement.id !== lastCheck),
    )

    if (newUnlocked) {
      setShowNewAchievement(newUnlocked)
      localStorage.setItem("lastAchievementCheck", newUnlocked.id)
    }
  }, [])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-600 bg-gray-100"
      case "rare":
        return "text-blue-600 bg-blue-100"
      case "epic":
        return "text-purple-600 bg-purple-100"
      case "legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300"
      case "rare":
        return "border-blue-300"
      case "epic":
        return "border-purple-300"
      case "legendary":
        return "border-yellow-300"
      default:
        return "border-gray-300"
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Pencapaian</h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Level {level}</div>
            <div className="text-lg font-bold text-yellow-500">{totalPoints} Poin</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? `${getRarityBorder(achievement.rarity)} bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700`
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 opacity-60"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    achievement.unlocked ? getRarityColor(achievement.rarity) : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}
                    >
                      {achievement.rarity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked ? "bg-green-500" : "bg-gray-400"
                          }`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Terus baca artikel untuk membuka pencapaian baru!
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Progress menuju level {level + 1}: {totalPoints % 50}/50 poin
            </div>
          </div>
        </div>
      </div>

      {/* New Achievement Notification */}
      {showNewAchievement && (
        <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 border-2 border-yellow-300 rounded-lg shadow-lg p-4 z-50 animate-bounce">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">Pencapaian Baru!</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{showNewAchievement.title}</p>
            </div>
            <button
              onClick={() => setShowNewAchievement(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}
