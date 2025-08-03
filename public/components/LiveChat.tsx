"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, User } from "lucide-react"

interface ChatMessage {
  id: number
  sender: "user" | "admin"
  message: string
  time: string
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "admin",
      message: "Halo! Ada yang bisa kami bantu?",
      time: "10:30",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: "user",
      message: newMessage,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate admin response
    setTimeout(() => {
      const adminResponse: ChatMessage = {
        id: Date.now() + 1,
        sender: "admin",
        message: "Terima kasih atas pertanyaan Anda. Tim kami akan segera membantu!",
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, adminResponse])
    }, 2000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-red-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs opacity-90">Tim Support LangsaPost</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  }`}
                >
                  <p>{message.message}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-red-100" : "text-gray-500"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
