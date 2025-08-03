"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled in localStorage
    const darkMode = localStorage.getItem("darkMode") === "true"
    setIsDark(darkMode)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  )
}
