"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, Send, Mic, ImageIcon, FileText, Sparkles, Brain, Zap } from "lucide-react"

interface ChatMessage {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: string
  isTyping?: boolean
  suggestions?: string[]
  attachments?: {
    type: "image" | "document" | "link"
    url: string
    title: string
  }[]
}

export default function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatMode, setChatMode] = useState<"general" | "news" | "creative">("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 1,
        type: "bot",
        content:
          "👋 Halo! Saya AI Assistant LangsaPost. Saya bisa membantu Anda dengan:\n\n🔍 Mencari berita terkini\n📝 Menulis artikel\n💡 Memberikan insight\n🎨 Membuat konten kreatif\n\nAda yang bisa saya bantu?",
        timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        suggestions: [
          "Berita terkini hari ini",
          "Tulis artikel tentang teknologi",
          "Analisis tren ekonomi",
          "Buat judul menarik",
        ],
      }
      setMessages([welcomeMessage])
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(
      () => {
        const botResponse = generateBotResponse(inputMessage)
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const generateBotResponse = (userInput: string): ChatMessage => {
    const input = userInput.toLowerCase()
    let response = ""
    let suggestions: string[] = []
    let attachments: any[] = []

    // Smart response generation based on input
    if (input.includes("berita") || input.includes("news") || input.includes("terkini")) {
      response = `📰 **Berita Terkini Hari Ini:**

🔥 **Breaking News:**
• Presiden Jokowi resmikan infrastruktur baru di Aceh
• Ekonomi Indonesia tumbuh 5.2% di Q2 2025
• Timnas Indonesia lolos semifinal Piala Asia

📊 **Trending Topics:**
• #InfrastrukturAceh - 15.4K mentions
• #EkonomiDigital - 12.8K mentions  
• #TimnasIndonesia - 18.2K mentions

💡 Mau saya carikan berita spesifik tentang topik tertentu?`

      suggestions = [
        "Berita politik terbaru",
        "Update ekonomi Indonesia",
        "Berita olahraga hari ini",
        "Teknologi terkini",
      ]

      attachments = [
        {
          type: "link",
          url: "/artikel/presiden-jokowi-resmikan-infrastruktur-baru-di-aceh",
          title: "Baca artikel lengkap: Infrastruktur Aceh",
        },
      ]
    } else if (input.includes("tulis") || input.includes("artikel") || input.includes("konten")) {
      response = `✍️ **AI Content Assistant Siap Membantu!**

Saya bisa membantu Anda membuat:

📝 **Artikel Lengkap**
• Riset otomatis dari berbagai sumber
• Struktur artikel yang SEO-friendly
• Fact-checking dan verifikasi

🎯 **Judul Menarik**
• Headline yang engaging
• Optimized untuk social media
• A/B testing suggestions

📊 **Konten Data-Driven**
• Infografik dan visualisasi
• Analisis tren dan statistik
• Insight berbasis AI

Topik apa yang ingin Anda tulis?`

      suggestions = [
        "Artikel tentang teknologi AI",
        "Konten ekonomi digital",
        "Berita politik terkini",
        "Review produk teknologi",
      ]
    } else if (input.includes("analisis") || input.includes("insight") || input.includes("tren")) {
      response = `🧠 **AI Analytics & Insights:**

📈 **Tren Terkini:**
• Teknologi AI: +45% interest
• Ekonomi Digital: +32% growth
• Sustainability: +28% awareness
• Remote Work: +15% adoption

🎯 **Prediksi 2025:**
• Metaverse adoption akan meningkat 60%
• Green technology jadi prioritas utama
• AI integration di semua sektor
• Digital payment dominasi transaksi

💡 **Rekomendasi Konten:**
Berdasarkan tren, konten tentang "AI dalam kehidupan sehari-hari" berpotensi viral dengan engagement rate 85%+

Mau analisis lebih mendalam tentang topik tertentu?`

      suggestions = [
        "Analisis tren teknologi",
        "Prediksi ekonomi 2025",
        "Insight media sosial",
        "Tren konsumen digital",
      ]
    } else if (input.includes("kreatif") || input.includes("ide") || input.includes("inspirasi")) {
      response = `🎨 **Creative AI Assistant:**

✨ **Ide Konten Kreatif:**

🎬 **Video Content:**
• "24 Jam Tanpa Internet" - Social experiment
• "AI vs Human" - Comparison series
• "Behind the News" - Newsroom documentary

📱 **Interactive Content:**
• Live polling tentang isu terkini
• Q&A session dengan AI
• Virtual newsroom tour
• Real-time fact checking

🎯 **Viral Content Ideas:**
• Meme news format untuk Gen Z
• TikTok news dalam 60 detik
• Instagram stories news digest
• Twitter thread investigasi

Mau saya kembangkan ide spesifik?`

      suggestions = ["Ide konten viral", "Format berita kreatif", "Engagement strategy", "Content calendar"]
    } else {
      // General AI response
      response = `🤖 **AI Assistant LangsaPost:**

Saya memahami pertanyaan Anda tentang "${userInput}". 

Berdasarkan database pengetahuan saya yang terintegrasi dengan:
• 📰 Real-time news feeds
• 📊 Analytics data
• 🧠 Machine learning insights
• 🌐 Global information networks

Saya bisa memberikan informasi yang akurat dan terkini. 

Apakah Anda ingin saya:
• Cari informasi lebih detail?
• Buat konten terkait topik ini?
• Berikan analisis mendalam?
• Suggest related topics?`

      suggestions = ["Jelaskan lebih detail", "Buat artikel tentang ini", "Cari berita terkait", "Analisis topik ini"]
    }

    return {
      id: Date.now(),
      type: "bot",
      content: response,
      timestamp: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      suggestions,
      attachments,
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const chatModes = [
    { id: "general", name: "General", icon: <Bot className="w-4 h-4" />, color: "bg-blue-500" },
    { id: "news", name: "News", icon: <FileText className="w-4 h-4" />, color: "bg-red-500" },
    { id: "creative", name: "Creative", icon: <Sparkles className="w-4 h-4" />, color: "bg-purple-500" },
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all transform hover:scale-110"
      >
        {isOpen ? (
          <span className="text-xl">×</span>
        ) : (
          <div className="relative">
            <Brain className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[600px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Powered by Advanced AI</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Online</span>
              </div>
            </div>

            {/* Chat Mode Selector */}
            <div className="flex space-x-1 mt-3">
              {chatModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setChatMode(mode.id as any)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-all ${
                    chatMode === mode.id
                      ? "bg-white bg-opacity-20 text-white"
                      : "bg-white bg-opacity-10 text-white opacity-70 hover:opacity-100"
                  }`}
                >
                  {mode.icon}
                  <span>{mode.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "bot" && <Brain className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment, index) => (
                            <a
                              key={index}
                              href={attachment.url}
                              className="block p-2 bg-blue-50 dark:bg-blue-900 rounded text-xs text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                            >
                              🔗 {attachment.title}
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 space-y-1">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Suggestions:</div>
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="block w-full text-left p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              💡 {suggestion}
                            </button>
                          ))}
                        </div>
                      )}

                      <p
                        className={`text-xs mt-1 ${
                          message.type === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">AI sedang berpikir...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Tanya apa saja ke AI..."
                  className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:bg-gray-700 dark:text-white"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>Powered by GPT-4 & Custom AI Models</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>Fast Response</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
