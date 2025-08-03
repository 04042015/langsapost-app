"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"

interface BookmarkButtonProps {
  articleId: number
  articleTitle: string
  articleSlug: string
}

export default function BookmarkButton({ articleId, articleTitle, articleSlug }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")
    setIsBookmarked(bookmarks.some((bookmark: any) => bookmark.id === articleId))
  }, [articleId])

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]")

    if (isBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarks.filter((bookmark: any) => bookmark.id !== articleId)
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
      setIsBookmarked(false)
    } else {
      // Add bookmark
      const newBookmark = {
        id: articleId,
        title: articleTitle,
        slug: articleSlug,
        savedAt: new Date().toISOString(),
      }
      bookmarks.push(newBookmark)
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
      setIsBookmarked(true)
    }
  }

  return (
    <button
      onClick={toggleBookmark}
      className={`p-2 rounded-lg transition-colors ${
        isBookmarked
          ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-900 dark:text-red-400"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      }`}
      title={isBookmarked ? "Hapus dari bookmark" : "Simpan ke bookmark"}
    >
      {isBookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
    </button>
  )
}
