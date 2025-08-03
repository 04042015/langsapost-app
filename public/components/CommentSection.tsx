"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, ThumbsUp, Reply, Flag } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  date: string
  likes: number
  replies?: Comment[]
}

const sampleComments: Comment[] = [
  {
    id: 1,
    author: "Budi Santoso",
    content: "Artikel yang sangat informatif! Terima kasih atas informasinya yang detail dan mudah dipahami.",
    date: "2 jam yang lalu",
    likes: 12,
    replies: [
      {
        id: 2,
        author: "Admin LangsaPost",
        content: "Terima kasih atas apresiasinya! Kami senang artikel ini bermanfaat untuk Anda.",
        date: "1 jam yang lalu",
        likes: 5,
      },
    ],
  },
  {
    id: 3,
    author: "Sari Dewi",
    content: "Saya setuju dengan poin-poin yang disampaikan. Semoga pemerintah dapat menindaklanjuti dengan baik.",
    date: "3 jam yang lalu",
    likes: 8,
  },
]

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: "Anda",
      content: newComment,
      date: "Baru saja",
      likes: 0,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleSubmitReply = (e: React.FormEvent, parentId: number) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now(),
      author: "Anda",
      content: replyContent,
      date: "Baru saja",
      likes: 0,
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyTo(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="w-5 h-5 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">
          Komentar ({comments.length + comments.reduce((acc, c) => acc + (c.replies?.length || 0), 0)})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar Anda..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Harap berkomentar dengan sopan dan konstruktif</p>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Kirim Komentar
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 mb-3">{comment.content}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Balas</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                    <Flag className="w-4 h-4" />
                    <span>Laporkan</span>
                  </button>
                </div>

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-4">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Tulis balasan..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setReplyTo(null)}
                        className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={!replyContent.trim()}
                        className="px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                      >
                        Balas
                      </button>
                    </div>
                  </form>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-100 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                            <span className="text-xs text-gray-500">{reply.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors text-xs">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
