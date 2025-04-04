"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Shield, Swords } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { CharacterSprite } from "@/components/character-sprites"

export default function DifficultyPage() {
  const searchParams = useSearchParams()
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [character, setCharacter] = useState({
    type: "human",
    hairStyle: "short",
    hairColor: "yellow",
    skinTone: "light",
    outfit: "casual",
    outfitColor: "red",
    name: "Player",
    power: "lightning",
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

        // Only update if we have at least one parameter
        if (characterType || hairStyle || hairColor || skinTone || outfit || outfitColor || name || power) {
          setCharacter({
            type: characterType || "human",
            hairStyle: hairStyle || "short",
            hairColor: hairColor || "yellow",
            skinTone: skinTone || "light",
            outfit: outfit || "casual",
            outfitColor: outfitColor || "red",
            name: name || "Player",
            power: power || "lightning",
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

      <h1 className="text-3xl font-bold text-center mb-8 pixel-font text-yellow-400">SELECT DIFFICULTY</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        <div
          className={`bg-green-900/30 border-2 ${selectedDifficulty === "normal" ? "border-yellow-400" : "border-gray-700"} 
                      rounded-lg p-6 cursor-pointer transition-all hover:scale-105`}
          onClick={() => setSelectedDifficulty("normal")}
        >
          <div className="w-16 h-16 rounded-full bg-green-900/50 flex items-center justify-center mb-4 mx-auto">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-center text-green-400">Normal Mode</h3>
          <ul className="space-y-2 text-yellow-400/80">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Balanced enemy AI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Standard health regeneration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Regular power cooldowns
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Perfect for casual players
            </li>
          </ul>
        </div>

        <div
          className={`bg-red-900/30 border-2 ${selectedDifficulty === "hard" ? "border-yellow-400" : "border-gray-700"} 
                      rounded-lg p-6 cursor-pointer transition-all hover:scale-105`}
          onClick={() => setSelectedDifficulty("hard")}
        >
          <div className="w-16 h-16 rounded-full bg-red-900/50 flex items-center justify-center mb-4 mx-auto">
            <Swords className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-center text-red-400">Hard Mode</h3>
          <ul className="space-y-2 text-yellow-400/80">
            <li className="flex items-center gap-2">
              <span className="text-red-400">✓</span> Aggressive enemy AI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✓</span> Reduced health regeneration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✓</span> Longer power cooldowns
            </li>
            <li className="flex items-center gap-2">
              <span className="text-red-400">✓</span> For experienced players
            </li>
          </ul>
        </div>
      </div>

      {/* Character Preview */}
      <div className="mt-8 max-w-4xl mx-auto w-full">
        <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <CharacterSprite
              type={character.type}
              hairStyle={character.hairStyle}
              hairColor={character.hairColor}
              skinTone={character.skinTone}
              outfit={character.outfit}
              outfitColor={character.outfitColor}
              power={character.power}
              size="medium"
            />
            <h3 className="mt-2 text-lg font-bold">{character.name}</h3>
            <p className="text-sm">{character.power.charAt(0).toUpperCase() + character.power.slice(1)} Power</p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-between max-w-6xl mx-auto w-full">
        <Link href="/powers">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        <Link
          href={
            selectedDifficulty
              ? `/background?characterType=${character.type}&hairStyle=${character.hairStyle}&hairColor=${character.hairColor}&skinTone=${character.skinTone}&outfit=${character.outfit}&outfitColor=${character.outfitColor}&name=${character.name}&power=${character.power}&difficulty=${selectedDifficulty}`
              : "#"
          }
        >
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2"
            disabled={!selectedDifficulty}
          >
            Next
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

