"use client"

import { useState } from "react"
import { Sparkles, Wand2, FileText, ImageIcon, Video, Mic, Brain, Zap } from "lucide-react"

interface GeneratedContent {
  type: "article" | "summary" | "headline" | "image" | "video" | "podcast"
  content: string
  metadata?: {
    wordCount?: number
    readingTime?: number
    seoScore?: number
    sentiment?: string
  }
}

export default function AIContentGenerator() {
  const [activeTab, setActiveTab] = useState<"article" | "summary" | "headline" | "image" | "video" | "podcast">(
    "article",
  )
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [generationProgress, setGenerationProgress] = useState(0)

  const contentTypes = [
    { id: "article", name: "Artikel Lengkap", icon: <FileText className="w-4 h-4" />, color: "bg-blue-500" },
    { id: "summary", name: "Ringkasan", icon: <Brain className="w-4 h-4" />, color: "bg-green-500" },
    { id: "headline", name: "Judul Menarik", icon: <Zap className="w-4 h-4" />, color: "bg-yellow-500" },
    { id: "image", name: "Gambar AI", icon: <ImageIcon className="w-4 h-4" />, color: "bg-purple-500" },
    { id: "video", name: "Video Script", icon: <Video className="w-4 h-4" />, color: "bg-red-500" },
    { id: "podcast", name: "Podcast Script", icon: <Mic className="w-4 h-4" />, color: "bg-indigo-500" },
  ]

  const generateContent = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Simulate different generation times based on content type
    const generationTime = {
      article: 5000,
      summary: 2000,
      headline: 1000,
      image: 3000,
      video: 4000,
      podcast: 3500,
    }

    setTimeout(() => {
      clearInterval(progressInterval)
      setGenerationProgress(100)

      // Generate mock content based on type
      let mockContent: GeneratedContent

      switch (activeTab) {
        case "article":
          mockContent = {
            type: "article",
            content: `# ${prompt}

Dalam perkembangan terkini, ${prompt.toLowerCase()} telah menjadi topik yang sangat menarik perhatian publik. Berdasarkan analisis mendalam dari berbagai sumber terpercaya, berikut adalah ulasan komprehensif mengenai hal tersebut.

## Latar Belakang

Fenomena ini bermula dari serangkaian peristiwa yang terjadi dalam beberapa bulan terakhir. Para ahli menilai bahwa perkembangan ini memiliki dampak signifikan terhadap berbagai aspek kehidupan masyarakat.

## Analisis Mendalam

Dari perspektif ekonomi, ${prompt.toLowerCase()} memberikan peluang sekaligus tantangan. Data menunjukkan adanya tren positif dalam beberapa indikator kunci, namun tetap diperlukan kehati-hatian dalam menghadapi potensi risiko.

## Dampak dan Implikasi

Dampak dari ${prompt.toLowerCase()} dapat dirasakan dalam berbagai sektor:

1. **Sektor Ekonomi**: Pertumbuhan yang signifikan dengan proyeksi positif
2. **Sektor Sosial**: Perubahan pola perilaku masyarakat
3. **Sektor Teknologi**: Inovasi dan adaptasi baru

## Kesimpulan

Mengingat kompleksitas isu ini, diperlukan pendekatan yang holistik dan berkelanjutan. Kolaborasi antara berbagai pihak menjadi kunci sukses dalam mengoptimalkan manfaat sambil meminimalkan risiko.

*Artikel ini digenerate oleh AI berdasarkan prompt: "${prompt}"*`,
            metadata: {
              wordCount: 245,
              readingTime: 2,
              seoScore: 85,
              sentiment: "Positif",
            },
          }
          break

        case "summary":
          mockContent = {
            type: "summary",
            content: `📋 **Ringkasan: ${prompt}**

🔍 **Poin Utama:**
• Perkembangan signifikan dalam ${prompt.toLowerCase()}
• Dampak positif terhadap berbagai sektor
• Diperlukan pendekatan strategis dan berkelanjutan

📊 **Data Kunci:**
• Pertumbuhan: +15% dari periode sebelumnya
• Tingkat kepuasan: 87% responden positif
• Proyeksi: Tren naik hingga akhir tahun

⚡ **Kesimpulan Cepat:**
${prompt} menunjukkan perkembangan yang menggembirakan dengan potensi dampak jangka panjang yang positif bagi masyarakat.`,
            metadata: {
              wordCount: 89,
              readingTime: 1,
              seoScore: 78,
              sentiment: "Positif",
            },
          }
          break

        case "headline":
          const headlines = [
            `🔥 BREAKING: ${prompt} Menggemparkan Indonesia - Ini Faktanya!`,
            `⚡ VIRAL: ${prompt} Jadi Trending #1, Netizen Heboh!`,
            `🚀 REVOLUSI: ${prompt} Mengubah Segalanya, Begini Dampaknya`,
            `💥 SENSASI: ${prompt} Bikin Geger, Ahli Beri Penjelasan`,
            `🌟 FENOMENA: ${prompt} Jadi Sorotan, Ini Analisis Lengkapnya`,
          ]
          mockContent = {
            type: "headline",
            content: headlines.join("\n\n"),
            metadata: {
              seoScore: 92,
              sentiment: "Engaging",
            },
          }
          break

        case "image":
          mockContent = {
            type: "image",
            content: `🎨 **AI Image Generated**

**Prompt:** ${prompt}

**Generated Image Description:**
Gambar berkualitas tinggi menampilkan ${prompt.toLowerCase()} dengan komposisi yang menarik. Menggunakan palet warna yang harmonis dengan pencahayaan dramatis yang menciptakan suasana profesional dan modern.

**Specifications:**
• Resolution: 1920x1080 (Full HD)
• Style: Photorealistic dengan sentuhan artistic
• Color Scheme: Vibrant dengan kontras tinggi
• Mood: Professional, engaging, dan eye-catching

**Usage Rights:** Bebas digunakan untuk keperluan editorial

[🖼️ Preview Image Generated]`,
            metadata: {
              seoScore: 88,
            },
          }
          break

        case "video":
          mockContent = {
            type: "video",
            content: `🎬 **Video Script: ${prompt}**

**OPENING (0-10 detik)**
[Visual: Logo LangsaPost dengan musik intro]
Narrator: "Selamat datang di LangsaPost, portal berita terpercaya Indonesia"

**HOOK (10-20 detik)**
[Visual: Footage terkait ${prompt}]
Narrator: "Hari ini kita akan membahas ${prompt.toLowerCase()} yang sedang menjadi perbincangan hangat"

**MAIN CONTENT (20-90 detik)**
[Visual: Infografik dan data pendukung]
Narrator: "Berdasarkan data terbaru, ${prompt.toLowerCase()} menunjukkan perkembangan yang signifikan..."

**EXPERT INTERVIEW (90-120 detik)**
[Visual: Wawancara dengan ahli]
Expert: "Fenomena ini memiliki dampak yang luas terhadap masyarakat..."

**CONCLUSION (120-140 detik)**
[Visual: Kesimpulan dengan call-to-action]
Narrator: "Itulah ulasan lengkap mengenai ${prompt.toLowerCase()}. Jangan lupa subscribe dan nyalakan notifikasi!"

**END SCREEN (140-150 detik)**
[Visual: Subscribe button dan video terkait]

**Total Duration:** 2 menit 30 detik
**Target Audience:** 18-45 tahun
**Platform:** YouTube, Instagram, TikTok`,
            metadata: {
              seoScore: 90,
            },
          }
          break

        case "podcast":
          mockContent = {
            type: "podcast",
            content: `🎙️ **Podcast Script: ${prompt}**

**EPISODE:** "Deep Dive: ${prompt}"
**DURATION:** 15-20 menit
**HOST:** Tim LangsaPost

---

**[INTRO MUSIC - 30 detik]**

**HOST:** Halo listeners, selamat datang di podcast LangsaPost! Saya host Anda hari ini, dan kita akan membahas topik yang sangat menarik: ${prompt}.

**[SEGMENT 1: PEMBUKAAN - 2 menit]**
HOST: Jadi, ${prompt.toLowerCase()} ini sedang ramai diperbincangkan. Mari kita mulai dengan pertanyaan dasar: apa sebenarnya yang terjadi?

**[SEGMENT 2: ANALISIS - 5 menit]**
HOST: Berdasarkan riset yang kami lakukan, ada beberapa poin penting yang perlu kita bahas...

**[SEGMENT 3: EXPERT INSIGHT - 5 menit]**
HOST: Kami juga sudah berbicara dengan beberapa ahli, dan ini insight menarik yang mereka berikan...

**[SEGMENT 4: DAMPAK - 3 menit]**
HOST: Sekarang, bagaimana dampaknya terhadap kita semua? Mari kita bahas...

**[SEGMENT 5: KESIMPULAN - 2 menit]**
HOST: Jadi, kesimpulannya adalah ${prompt.toLowerCase()} ini memang fenomena yang patut kita perhatikan...

**[OUTRO - 1 menit]**
HOST: Terima kasih sudah mendengarkan! Jangan lupa subscribe dan beri rating 5 bintang!

**[OUTRO MUSIC - 30 detik]**

**SHOW NOTES:**
• Topik: ${prompt}
• Durasi: 15-20 menit  
• Format: Conversational
• Target: General audience`,
            metadata: {
              seoScore: 86,
            },
          }
          break

        default:
          mockContent = {
            type: "article",
            content: "Error generating content",
          }
      }

      setGeneratedContent(mockContent)
      setIsGenerating(false)
      setGenerationProgress(0)
    }, generationTime[activeTab])
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">AI Content Generator</h3>
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          ✨ PREMIUM AI
        </span>
      </div>

      {/* Content Type Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id as any)}
            className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
              activeTab === type.id
                ? `${type.color} text-white border-transparent`
                : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300"
            }`}
          >
            {type.icon}
            <span className="text-sm font-medium">{type.name}</span>
          </button>
        ))}
      </div>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Describe what you want to generate:
        </label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Contoh: "Perkembangan teknologi AI di Indonesia", "Dampak ekonomi digital", "Tren startup 2025"...`}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
          />
          <div className="absolute bottom-3 right-3">
            <Wand2 className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateContent}
        disabled={!prompt.trim() || isGenerating}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate with AI</span>
          </>
        )}
      </button>

      {/* Generation Progress */}
      {isGenerating && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>AI sedang bekerja...</span>
            <span>{Math.round(generationProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Generated Content */}
      {generatedContent && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Generated Content</h4>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                Copy
              </button>
              <button className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
                Save
              </button>
              <button className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 transition-colors">
                Edit
              </button>
            </div>
          </div>

          {/* Content Metadata */}
          {generatedContent.metadata && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-3 bg-white dark:bg-gray-800 rounded">
              {generatedContent.metadata.wordCount && (
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">{generatedContent.metadata.wordCount}</div>
                  <div className="text-xs text-gray-500">Words</div>
                </div>
              )}
              {generatedContent.metadata.readingTime && (
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{generatedContent.metadata.readingTime}m</div>
                  <div className="text-xs text-gray-500">Read Time</div>
                </div>
              )}
              {generatedContent.metadata.seoScore && (
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">{generatedContent.metadata.seoScore}/100</div>
                  <div className="text-xs text-gray-500">SEO Score</div>
                </div>
              )}
              {generatedContent.metadata.sentiment && (
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{generatedContent.metadata.sentiment}</div>
                  <div className="text-xs text-gray-500">Sentiment</div>
                </div>
              )}
            </div>
          )}

          {/* Generated Content Display */}
          <div className="bg-white dark:bg-gray-800 rounded p-4 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-mono">
              {generatedContent.content}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
