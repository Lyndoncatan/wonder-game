"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AudioPlayer } from "@/components/audio-player"

export default function HomePage() {
  // Add pixel animation effect to title
  useEffect(() => {
    const titleElement = document.getElementById("game-title")
    if (titleElement) {
      const letters = titleElement.textContent?.split("") || []
      titleElement.textContent = ""

      letters.forEach((letter, index) => {
        const span = document.createElement("span")
        span.textContent = letter
        span.style.display = "inline-block"
        span.style.animation = `blink ${Math.random() * 2 + 0.5}s infinite`
        span.style.animationDelay = `${index * 0.1}s`
        titleElement.appendChild(span)
      })
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400 px-4">
      <AudioPlayer src="/audio/background-music.mp3" />

      <div className="text-center">
        <h1 id="game-title" className="text-6xl font-bold mb-4 text-yellow-400 pixel-font">
          WONDER
        </h1>
        <p className="text-xl mb-8">A pixel battle adventure with elemental powers</p>

        {/* Empty space where characters were */}
        <div className="mb-8 h-32"></div>

        <div className="space-y-4">
          <Link href="/customize">
            <Button className="w-48 h-12 bg-yellow-500 hover:bg-yellow-600 text-black font-bold pixel-font">
              START GAME
            </Button>
          </Link>

          <Link href="/how-to-play">
            <Button
              variant="outline"
              className="w-48 h-12 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 pixel-font"
            >
              HOW TO PLAY
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 text-center">
        <p className="text-yellow-400/60 pixel-font text-sm">© 2025 Wonder Game</p>
        <p className="text-yellow-400/60 pixel-font text-xs mt-1">Created By Lyndon Catan</p>
      </div>
    </div>
  )
}

