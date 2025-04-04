"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Zap, Flame, Snowflake, Mountain, Wind } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { CharacterSprite } from "@/components/character-sprites"

const POWERS = [
  {
    id: "lightning",
    name: "Lightning",
    icon: Zap,
    color: "text-purple-400",
    bgColor: "bg-purple-900/50",
    description: "Harness the power of electricity to stun enemies and deliver quick strikes.",
  },
  {
    id: "fire",
    name: "Fire",
    icon: Flame,
    color: "text-orange-400",
    bgColor: "bg-orange-900/50",
    description: "Unleash devastating flames that burn through defenses and deal damage over time.",
  },
  {
    id: "ice",
    name: "Ice",
    icon: Snowflake,
    color: "text-cyan-400",
    bgColor: "bg-cyan-900/50",
    description: "Freeze your opponents and create barriers of ice to control the battlefield.",
  },
  {
    id: "rock",
    name: "Rock",
    icon: Mountain,
    color: "text-amber-400",
    bgColor: "bg-amber-900/50",
    description: "Command the earth to create powerful defenses and devastating attacks.",
  },
  {
    id: "air",
    name: "Air",
    icon: Wind,
    color: "text-sky-400",
    bgColor: "bg-sky-900/50",
    description: "Control the winds to gain superior mobility and push enemies away.",
  },
]

export default function PowersPage() {
  const searchParams = useSearchParams()
  const [selectedPower, setSelectedPower] = useState(null)
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

        // Only update if we have at least one parameter
        if (characterType || hairStyle || hairColor || skinTone || outfit || outfitColor || name) {
          setCharacter({
            type: characterType || "human",
            hairStyle: hairStyle || "short",
            hairColor: hairColor || "yellow",
            skinTone: skinTone || "light",
            outfit: outfit || "casual",
            outfitColor: outfitColor || "red",
            name: name || "Player",
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

      <h1 className="text-3xl font-bold text-center mb-8 pixel-font text-yellow-400">CHOOSE YOUR POWER</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-6xl mx-auto w-full">
        {POWERS.map((power) => (
          <div
            key={power.id}
            className={`${power.bgColor} border-2 ${selectedPower === power.id ? "border-yellow-400" : "border-gray-700"} 
                      rounded-lg p-4 cursor-pointer transition-all hover:scale-105 flex flex-col items-center`}
            onClick={() => setSelectedPower(power.id)}
          >
            <div
              className={`w-16 h-16 rounded-full ${power.bgColor} flex items-center justify-center mb-3 power-${power.id}`}
            >
              <power.icon className={`w-8 h-8 ${power.color}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${power.color}`}>{power.name}</h3>
            <p className="text-sm text-center text-gray-300">{power.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 pixel-font text-yellow-400">Power Preview</h2>
        <div className="bg-gray-900 rounded-lg p-6 h-64 flex items-center justify-center pixel-border">
          {selectedPower ? (
            <div className="text-center">
              <CharacterSprite
                type={character.type}
                hairStyle={character.hairStyle}
                hairColor={character.hairColor}
                skinTone={character.skinTone}
                outfit={character.outfit}
                outfitColor={character.outfitColor}
                power={selectedPower}
                size="large"
              />
              <div
                className={`w-24 h-24 mx-auto rounded-full ${POWERS.find((p) => p.id === selectedPower).bgColor} 
                            flex items-center justify-center mb-4 power-${selectedPower}`}
              >
                {(() => {
                  const PowerIcon = POWERS.find((p) => p.id === selectedPower).icon
                  return <PowerIcon className={`w-12 h-12 ${POWERS.find((p) => p.id === selectedPower).color}`} />
                })()}
              </div>
              <h3 className={`text-2xl font-bold ${POWERS.find((p) => p.id === selectedPower).color}`}>
                {POWERS.find((p) => p.id === selectedPower).name} Power
              </h3>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p className="text-xl">Select a power to see preview</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-between max-w-6xl mx-auto w-full">
        <Link href="/customize">
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
            selectedPower
              ? `/power-preview?characterType=${character.type}&hairStyle=${character.hairStyle}&hairColor=${character.hairColor}&skinTone=${character.skinTone}&outfit=${character.outfit}&outfitColor=${character.outfitColor}&name=${character.name}&power=${selectedPower}`
              : "#"
          }
        >
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2"
            disabled={!selectedPower}
          >
            Next
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full pt-8 text-center">
        <p className="text-yellow-400/60 pixel-font text-sm">© 2025 Wonder Game</p>
        <p className="text-yellow-400/60 pixel-font text-xs mt-1">Created By Lyndon Catan</p>
      </div>
    </div>
  )
}

