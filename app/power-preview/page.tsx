"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Volume2 } from "lucide-react"
import { Mountain, Zap, Flame, Snowflake, Wind } from "lucide-react"

export default function PowerPreviewPage() {
  const searchParams = useSearchParams()
  const [power, setPower] = useState("rock")
  const [character, setCharacter] = useState({
    type: "human",
    hairStyle: "short",
    hairColor: "yellow",
    skinTone: "light",
    outfit: "casual",
    outfitColor: "red",
    name: "Player",
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
        const powerParam = searchParams.get("power")

        // Only update if we have at least one parameter
        if (characterType || hairStyle || hairColor || skinTone || outfit || outfitColor || name || powerParam) {
          setCharacter({
            type: characterType || "human",
            hairStyle: hairStyle || "short",
            hairColor: hairColor || "yellow",
            skinTone: skinTone || "light",
            outfit: outfit || "casual",
            outfitColor: outfitColor || "red",
            name: name || "Player",
          })

          if (powerParam) {
            setPower(powerParam)
          }

          // Mark params as loaded to prevent further updates
          setParamsLoaded(true)
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error)
        setParamsLoaded(true) // Mark as loaded even on error to prevent retries
      }
    }
  }, [searchParams, paramsLoaded])

  // Get power icon and name
  const getPowerIcon = () => {
    switch (power) {
      case "lightning":
        return <Zap className="w-12 h-12 text-yellow-400" />
      case "fire":
        return <Flame className="w-12 h-12 text-yellow-400" />
      case "ice":
        return <Snowflake className="w-12 h-12 text-yellow-400" />
      case "rock":
        return <Mountain className="w-12 h-12 text-yellow-400" />
      case "air":
        return <Wind className="w-12 h-12 text-yellow-400" />
      default:
        return <Mountain className="w-12 h-12 text-yellow-400" />
    }
  }

  const getPowerName = () => {
    return power.charAt(0).toUpperCase() + power.slice(1) + " Power"
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 flex flex-col">
      {/* Header */}
      <div className="w-full bg-black py-4">
        <h1 className="text-4xl font-bold text-center pixel-font text-yellow-400">Power Preview</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl border-4 border-yellow-400 bg-[#0a0a20] rounded-none p-6 relative">
          {/* Character Circle */}
          <div className="flex justify-center mb-12">
            <div className="w-32 h-32 rounded-full bg-amber-700 flex items-center justify-center">
              <span className="text-white text-2xl">.haracte</span>
            </div>
          </div>

          {/* Power Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-amber-900 flex items-center justify-center glow-effect">
              {getPowerIcon()}
            </div>
          </div>

          {/* Power Name */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-yellow-400 pixel-font">{getPowerName()}</h2>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full p-4 flex justify-between">
        <Link href="/powers">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-yellow-500 bg-black text-yellow-400 hover:bg-yellow-500/10 px-8 py-6"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2 px-8 py-6">
          <Volume2 size={16} />
        </Button>

        <Link
          href={`/difficulty?characterType=${character.type}&hairStyle=${character.hairStyle}&hairColor=${character.hairColor}&skinTone=${character.skinTone}&outfit=${character.outfit}&outfitColor=${character.outfitColor}&name=${character.name}&power=${power}`}
        >
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2 px-8 py-6">
            Next
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full p-4 text-center">
        <p className="text-yellow-400 pixel-font text-sm">© 2025 Wonder Game</p>
        <p className="text-yellow-400 pixel-font text-xs mt-1">Created By Lyndon Catan</p>
      </div>
    </div>
  )
}

