"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CloudSun, MapPin } from "lucide-react"

interface WeatherData {
  temp: number
  city: string
  description: string
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    // TODO: fetch API cuaca di production
    // Mock data
    setWeather({
      temp: 30,
      city: "Langsa",
      description: "Cerah Berawan",
    })
  }, [])

  if (!weather) return null

  return (
    <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CloudSun className="h-4 w-4" />
            <div>
              <div className="text-lg font-bold">{weather.temp}°C</div>
              <div className="text-xs opacity-90">{weather.description}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs opacity-90">
              <MapPin className="h-3 w-3" />
              {weather.city}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
