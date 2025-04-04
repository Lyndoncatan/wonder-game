"use client"

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioPlayerProps {
  src: string
  autoPlay?: boolean
}

export function AudioPlayer({ src, autoPlay = true }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // Auto play if enabled
    if (autoPlay) {
      // Need to handle autoplay restrictions
      const playPromise = audio.play()

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          // Show UI to let the user manually start playback
          console.log("Autoplay prevented:", error)
        })
      }
    }

    // Cleanup
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [src, autoPlay])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.5
        audioRef.current.play().catch((e) => console.log("Play prevented:", e))
      } else {
        audioRef.current.volume = 0
      }
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="audio-controls">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleMute}
        className="bg-black border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </Button>
    </div>
  )
}

