"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Target, Award, AlertCircle, CheckCircle, Zap } from "lucide-react"

interface SEOMetrics {
  overallScore: number
  titleScore: number
  metaScore: number
  contentScore: number
  technicalScore: number
  suggestions: string[]
  keywords: {
    primary: string[]
    secondary: string[]
    trending: string[]
  }
}

export default function AdvancedSEOOptimizer() {
  const [seoMetrics, setSeoMetrics] = useState<SEOMetrics | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState("current")

  useEffect(() => {
    // Simulate SEO analysis
    const analyzeSEO = () => {
      setIsAnalyzing(true)
      
      setTimeout(() => {
        const mockMetrics: SEOMetrics = {
          overallScore: 87,
          titleScore: 92,
          metaScore: 85,
          contentScore: 89,
          technicalScore: 82,
          suggestions: [
            "Tambahkan internal links ke artikel terkait",
            "Optimasi alt text untuk gambar",
            "Perbaiki meta description length (terlalu pendek)",
            "Tambahkan structured data untuk artikel",
            "Gunakan heading tags secara hierarkis",
            "Tingkatkan loading speed dengan image compression"
          ],
          keywords: {
            primary: ["infrastruktur aceh", "pembangunan indonesia", "ekonomi daerah"],
            secondary: ["jokowi", "investasi", "kesejahteraan masyarakat"],
            trending: ["smart city", "sustainable development", "digital transformation"]
          }
        }
        
        setSeoMetrics(mockMetrics)
        setIsAnalyzing(false)
      }, 2000)
    }

    analyzeSEO()
  }, [selectedArticle])

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500 bg-green-100"
    if (score >= 70) return "text-yellow-500 bg-yellow-100"
    return "text-red-500 bg-red-100"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (score >= 70) return <AlertCircle className="w-4 h-4 text-yellow-500" />
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-green-500" />
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">SEO Optimizer</h3>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
            AI-Powered
          </span>
        </div>
        <button
          onClick={() => setIsAnalyzing(true)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
        >
          <Zap className="w-4 h-4" />
          <span>Re-analyze</span>
        </button>
      </div>

      {isAnalyzing ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Analyzing SEO Performance</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            AI sedang menganalisis konten, keywords, dan technical SEO...
          </p>
        </div>
      ) : seoMetrics ? (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg">
            <div className="text-4xl font-bold text-green-500 mb-2">{seoMetrics.overallScore}/100</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Overall SEO Score</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Excellent optimization level</div>
          </div>

          {/* Detailed Scores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Title Optimization</span>
                {getScoreIcon(seoMetrics.titleScore)}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${seoMetrics.titleScore}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(seoMetrics.titleScore)}`}>
                  {seoMetrics.titleScore}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</span>
                {getScoreIcon(seoMetrics.metaScore)}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${seoMetrics.metaScore}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(seoMetrics.metaScore)}`}>
                  {seoMetrics.metaScore}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Content Quality</span>
                {getScoreIcon(seoMetrics.contentScore)}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${seoMetrics.contentScore}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(seoMetrics.contentScore)}`}>
                  {seoMetrics.contentScore}
                </span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Technical SEO</span>
                {getScoreIcon(seoMetrics.technicalScore)}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${seoMetrics.technicalScore}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(seoMetrics.technicalScore)}`}>
                  {seoMetrics.technicalScore}
                </span>
              </div>
            </div>
          </div>

          {/* Keywords Analysis */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="w-4 h-4 text-blue-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">Keywords Analysis</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Keywords</div>
                <div className="flex flex-wrap gap-1">
                  {seoMetrics.keywords.primary.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secondary Keywords</div>
                <div className="flex flex-wrap gap-1">
                  {seoMetrics.keywords.secondary.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-1 mb-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Trending Keywords</div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {seoMetrics.keywords.trending.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      {keyword} 🔥
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-4 h-4 text-yellow-500" />
              <h4 className="font-semibold text-gray-900 dark:text-white">AI Recommendations</h4>
            </div>
            <div className="space-y-2">
              {seoMetrics.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-green\
