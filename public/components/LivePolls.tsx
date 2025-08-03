"use client"

import { useState, useEffect } from "react"
import { Vote, Users, Clock, BarChart } from "lucide-react"

interface Poll {
  id: number
  question: string
  options: {
    id: number
    text: string
    votes: number
    percentage: number
  }[]
  totalVotes: number
  endTime: string
  isActive: boolean
}

export default function LivePolls() {
  const [currentPoll, setCurrentPoll] = useState<Poll | null>(null)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    // Simulate live poll data
    const mockPoll: Poll = {
      id: 1,
      question: "Menurut Anda, sektor mana yang paling penting untuk dikembangkan Indonesia di 2025?",
      options: [
        { id: 1, text: "Teknologi & Digital", votes: 1250, percentage: 35.2 },
        { id: 2, text: "Infrastruktur", votes: 980, percentage: 27.6 },
        { id: 3, text: "Pendidikan", votes: 750, percentage: 21.1 },
        { id: 4, text: "Kesehatan", votes: 570, percentage: 16.1 },
      ],
      totalVotes: 3550,
      endTime: "2025-07-10T23:59:59",
      isActive: true,
    }

    setCurrentPoll(mockPoll)

    // Check if user has already voted
    const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
    setHasVoted(votedPolls.includes(mockPoll.id))

    // Update countdown timer
    const updateTimer = () => {
      const now = new Date().getTime()
      const endTime = new Date(mockPoll.endTime).getTime()
      const distance = endTime - now

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${hours}j ${minutes}m`)
      } else {
        setTimeLeft("Berakhir")
      }
    }

    updateTimer()
    const timer = setInterval(updateTimer, 60000)

    return () => clearInterval(timer)
  }, [])

  const handleVote = (optionId: number) => {
    if (hasVoted || !currentPoll) return

    setSelectedOption(optionId)

    // Simulate vote submission
    setTimeout(() => {
      // Update local storage
      const votedPolls = JSON.parse(localStorage.getItem("votedPolls") || "[]")
      votedPolls.push(currentPoll.id)
      localStorage.setItem("votedPolls", JSON.stringify(votedPolls))

      // Update poll data (simulate real-time update)
      const updatedPoll = { ...currentPoll }
      updatedPoll.options = updatedPoll.options.map((option) => {
        if (option.id === optionId) {
          option.votes += 1
        }
        return option
      })
      updatedPoll.totalVotes += 1

      // Recalculate percentages
      updatedPoll.options = updatedPoll.options.map((option) => ({
        ...option,
        percentage: (option.votes / updatedPoll.totalVotes) * 100,
      }))

      setCurrentPoll(updatedPoll)
      setHasVoted(true)
    }, 1000)
  }

  if (!currentPoll) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Vote className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Live Poll</h3>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            LIVE
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{currentPoll.totalVotes.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}</span>
          </div>
        </div>
      </div>

      <h4 className="font-semibold text-gray-900 dark:text-white mb-6">{currentPoll.question}</h4>

      <div className="space-y-3">
        {currentPoll.options.map((option) => (
          <div key={option.id} className="relative">
            <button
              onClick={() => handleVote(option.id)}
              disabled={hasVoted}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                hasVoted
                  ? selectedOption === option.id
                    ? "border-green-500 bg-green-50 dark:bg-green-900"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                  : "border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900 cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">{option.text}</span>
                {hasVoted && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {option.percentage.toFixed(1)}%
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({option.votes})</span>
                  </div>
                )}
              </div>

              {hasVoted && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${option.percentage}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {hasVoted ? (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg">
          <div className="flex items-center space-x-2 text-green-700 dark:text-green-300">
            <BarChart className="w-4 h-4" />
            <span className="font-medium">Terima kasih sudah berpartisipasi!</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            Hasil akan diupdate secara real-time. Bagikan poll ini ke teman-teman Anda!
          </p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Pilih salah satu opsi di atas untuk memberikan suara Anda. Poll akan berakhir dalam {timeLeft}.
          </p>
        </div>
      )}
    </div>
  )
}
