"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"

const BACKGROUNDS = [
  {
    id: "city-sunset",
    name: "City Sunset",
    description: "A vibrant cityscape with tall buildings against a pink sunset sky.",
    src: "/images/backgrounds/city-sunset.png",
  },
  {
    id: "green-fields",
    name: "Green Fields",
    description: "Peaceful meadows with a winding river under an orange sky.",
    src: "/images/backgrounds/green-fields.png",
  },
  {
    id: "magic-forest",
    name: "Magic Forest",
    description: "A mystical forest with glowing lights and magical elements.",
    src: "/images/backgrounds/magic-forest.png",
  },
  {
    id: "mountain-graves",
    name: "Mountain Graves",
    description: "An eerie mountain scene with ancient standing stones.",
    src: "/images/backgrounds/mountain-graves.png",
  },
]

export default function BackgroundPage() {
  const searchParams = useSearchParams()
  const [selectedBackground, setSelectedBackground] = useState("city-sunset")
  const [character, setCharacter] = useState({
    type: "human",
    hairStyle: "short",
    hairColor: "yellow",
    skinTone: "light",
    outfit: "casual",
    outfitColor: "red",
    name: "Player",
    power: "lightning",
    difficulty: "normal",
  })

  // This flag prevents the infinite loop by ensuring we only update state once
  const [paramsLoaded, setParamsLoaded] = useState(false)

  // Get character data from URL params - only run once when component mounts
  useEffect(() => {
    if (searchParams && !paramsLoaded) {
      try {
        const characterType = searchParams.get("characterType")
        const hairStyle = searchParams.get("hairStyle")
        const hairColor = searchParams.get("hairColor")
        const skinTone = searchParams.get("skinTone")
        const outfit = searchParams.get("outfit")
        const outfitColor = searchParams.get("outfitColor")
        const name = searchParams.get("name")
        const power = searchParams.get("power")
        const difficulty = searchParams.get("difficulty")

        // Only update if we have at least one parameter
        if (
          characterType ||
          hairStyle ||
          hairColor ||
          skinTone ||
          outfit ||
          outfitColor ||
          name ||
          power ||
          difficulty
        ) {
          setCharacter({
            type: characterType || "human",
            hairStyle: hairStyle || "short",
            hairColor: hairColor || "yellow",
            skinTone: skinTone || "light",
            outfit: outfit || "casual",
            outfitColor: outfitColor || "red",
            name: name || "Player",
            power: power || "lightning",
            difficulty: difficulty || "normal",
          })

          // Mark params as loaded to prevent further updates
          setParamsLoaded(true)
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error)
        setParamsLoaded(true) // Mark as loaded even on error to prevent retries
      }
    }
  }, [searchParams, paramsLoaded])

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4 flex flex-col">
      <AudioPlayer src="/audio/background-music.mp3" />

      <h1 className="text-3xl font-bold text-center mb-8 pixel-font text-yellow-400">SELECT BATTLE ARENA</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {BACKGROUNDS.map((background) => (
          <div
            key={background.id}
            className={`relative border-2 ${selectedBackground === background.id ? "border-yellow-400" : "border-gray-700"} 
                        rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-105`}
            onClick={() => setSelectedBackground(background.id)}
          >
            <div className="aspect-video relative">
              <Image
                src={background.src || "/placeholder.svg"}
                alt={background.name}
                fill
                className="object-cover pixelated"
              />
              {selectedBackground === background.id && (
                <div className="absolute top-2 right-2 bg-yellow-500 rounded-full p-1">
                  <Check className="w-5 h-5 text-black" />
                </div>
              )}
            </div>
            <div className="p-3 bg-gray-900">
              <h3 className="text-lg font-bold">{background.name}</h3>
              <p className="text-sm text-yellow-400/70">{background.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div className="mt-8 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 pixel-font text-yellow-400">Preview</h2>
        <div className="relative h-64 rounded-lg overflow-hidden pixel-border">
          <Image
            src={BACKGROUNDS.find((bg) => bg.id === selectedBackground)?.src || BACKGROUNDS[0].src}
            alt="Selected background"
            fill
            className="object-cover pixelated"
          />

          {/* Battle characters preview */}
          <div className="absolute inset-0 flex items-end justify-between px-16 pb-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center mb-2">
                <span className="text-white font-bold">YOU</span>
              </div>
              <div className="text-white text-sm pixel-font">{character.name}</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center mb-2">
                <span className="text-white font-bold">ENEMY</span>
              </div>
              <div className="text-white text-sm pixel-font">
                {character.difficulty === "normal" ? "Dark Warrior" : "Elite Warrior"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-between max-w-6xl mx-auto w-full">
        <Link href="/difficulty">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        <Link
          href={`/battle?characterType=${character.type}&hairStyle=${character.hairStyle}&hairColor=${character.hairColor}&skinTone=${character.skinTone}&outfit=${character.outfit}&outfitColor=${character.outfitColor}&name=${character.name}&power=${character.power}&difficulty=${character.difficulty}&background=${selectedBackground}`}
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2">
            Start Battle
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

