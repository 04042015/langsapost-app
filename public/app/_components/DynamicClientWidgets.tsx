'use client'

import dynamic from 'next/dynamic'

const WeatherWidget = dynamic(() => import('@/components/WeatherWidget'), { ssr: false })
const LiveChat = dynamic(() => import('@/components/LiveChat'), { ssr: false })
const PWAInstallPrompt = dynamic(() => import('@/components/PWAInstallPrompt'), { ssr: false })
const NotificationManager = dynamic(() => import('@/components/NotificationManager'), { ssr: false })
const InteractiveChart = dynamic(() => import('@/components/InteractiveChart'), { ssr: false })
const LivePolls = dynamic(() => import('@/components/LivePolls'), { ssr: false })
const SocialMediaFeed = dynamic(() => import('@/components/SocialMediaFeed'), { ssr: false })
const ReadingAchievements = dynamic(() => import('@/components/ReadingAchievements'), { ssr: false })
const AIRecommendations = dynamic(() => import('@/components/AIRecommendations'), { ssr: false })

export default function DynamicClientWidgets() {
  return (
    <>
      <WeatherWidget />
      <LiveChat />
      <PWAInstallPrompt />
      <NotificationManager />
      <InteractiveChart />
      <LivePolls />
      <SocialMediaFeed />
      <ReadingAchievements />
      <AIRecommendations />
    </>
  )
                                }
