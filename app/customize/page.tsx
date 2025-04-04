"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { CharacterSprite } from "@/components/character-sprites"
import {
  CHARACTER_TYPES,
  HAIR_STYLES,
  HAIR_COLORS,
  SKIN_TONES,
  OUTFITS,
  OUTFIT_COLORS,
} from "@/components/character-sprites"

export default function CustomizePage() {
  const [character, setCharacter] = useState({
    type: "human",
    hairStyle: "short",
    hairColor: "yellow",
    skinTone: "light",
    outfit: "casual",
    outfitColor: "red",
    name: "Player",
    power: "lightning", // Default power for preview
  })

  const updateCharacter = (key: string, value: string) => {
    setCharacter((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Add pixel animation to title
  useEffect(() => {
    const titleElement = document.getElementById("customize-title")
    if (titleElement) {
      titleElement.classList.add("pixel-blink")
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4 flex flex-col">
      <AudioPlayer src="/audio/background-music.mp3" />

      <h1 id="customize-title" className="text-3xl font-bold text-center mb-8 pixel-font text-yellow-400">
        CUSTOMIZE CHARACTER
      </h1>

      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">
        {/* Character Preview */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-64 h-64 bg-gray-900 rounded-lg relative overflow-hidden pixel-border mb-4 flex items-center justify-center">
            <CharacterSprite
              type={character.type}
              hairStyle={character.hairStyle}
              hairColor={character.hairColor}
              skinTone={character.skinTone}
              outfit={character.outfit}
              outfitColor={character.outfitColor}
              power={character.power}
              size="large"
            />
          </div>

          <input
            type="text"
            value={character.name}
            onChange={(e) => {
              const newName = e.target.value || ""
              updateCharacter("name", newName)
            }}
            placeholder="Character Name"
            maxLength={12}
            className="bg-black border-2 border-yellow-500 rounded px-4 py-2 text-center w-full max-w-xs pixel-font text-sm text-yellow-400"
          />
        </div>

        {/* Customization Options */}
        <div className="flex-1">
          <Tabs defaultValue="type" className="w-full">
            <TabsList className="grid grid-cols-5 mb-4 bg-black border-2 border-yellow-500">
              <TabsTrigger value="type" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Type
              </TabsTrigger>
              <TabsTrigger value="hair" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Hair
              </TabsTrigger>
              <TabsTrigger value="skin" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Skin
              </TabsTrigger>
              <TabsTrigger value="outfit" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Outfit
              </TabsTrigger>
              <TabsTrigger value="color" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                Player
              </TabsTrigger>
            </TabsList>

            {/* Character Type */}
            <TabsContent value="type" className="space-y-4">
              <h3 className="text-lg font-medium">Character Type</h3>
              <div className="grid grid-cols-3 gap-2">
                {CHARACTER_TYPES.map((type) => (
                  <Button
                    key={type.id}
                    variant={character.type === type.id ? "default" : "outline"}
                    onClick={() => updateCharacter("type", type.id)}
                    className={`h-20 flex flex-col items-center justify-center gap-2 ${character.type === type.id ? "bg-yellow-500 text-black" : "border-yellow-500 text-yellow-400"}`}
                  >
                    <CharacterSprite
                      type={type.id}
                      hairStyle={character.hairStyle}
                      hairColor={character.hairColor}
                      skinTone={character.skinTone}
                      outfit={character.outfit}
                      outfitColor={character.outfitColor}
                      power={character.power}
                      size="small"
                    />
                    <span>{type.name}</span>
                  </Button>
                ))}
              </div>

              {/* No reference images */}
            </TabsContent>

            {/* Hair Style */}
            <TabsContent value="hair" className="space-y-4">
              <h3 className="text-lg font-medium">Hair Style</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {HAIR_STYLES.map((style) => (
                  <Button
                    key={style.id}
                    variant={character.hairStyle === style.id ? "default" : "outline"}
                    onClick={() => updateCharacter("hairStyle", style.id)}
                    className={`h-12 ${character.hairStyle === style.id ? "bg-yellow-500 text-black" : "border-yellow-500 text-yellow-400"}`}
                  >
                    {style.name}
                  </Button>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Hair Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {HAIR_COLORS.map((color) => (
                    <Button
                      key={color.id}
                      variant="outline"
                      onClick={() => updateCharacter("hairColor", color.id)}
                      className={`h-12 flex flex-col items-center justify-center ${character.hairColor === color.id ? "ring-2 ring-white" : ""}`}
                    >
                      <div className="w-6 h-6 rounded-full mb-1" style={{ backgroundColor: color.value }} />
                      <span className="text-xs">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              {/* No reference images */}
            </TabsContent>

            {/* Skin Tone */}
            <TabsContent value="skin" className="space-y-4">
              <h3 className="text-lg font-medium">Skin Tone</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SKIN_TONES.map((tone) => (
                  <Button
                    key={tone.id}
                    variant={character.skinTone === tone.id ? "default" : "outline"}
                    onClick={() => updateCharacter("skinTone", tone.id)}
                    className={`h-16 flex flex-col items-center justify-center ${character.skinTone === tone.id ? "bg-yellow-500 text-black" : "border-yellow-500 text-yellow-400"}`}
                  >
                    <div className="w-6 h-6 rounded-full mb-1" style={{ backgroundColor: tone.value }} />
                    <span>{tone.name}</span>
                  </Button>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Reference Images</h3>
                <div className="bg-gray-900 rounded-lg p-2">
                  <Image
                    src="/images/standing-characters.png"
                    alt="Character References"
                    width={300}
                    height={100}
                    className="pixelated w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Outfit Style */}
            <TabsContent value="outfit" className="space-y-4">
              <h3 className="text-lg font-medium">Outfit Style</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {OUTFITS.map((outfit) => (
                  <Button
                    key={outfit.id}
                    variant={character.outfit === outfit.id ? "default" : "outline"}
                    onClick={() => updateCharacter("outfit", outfit.id)}
                    className={`h-12 ${character.outfit === outfit.id ? "bg-yellow-500 text-black" : "border-yellow-500 text-yellow-400"}`}
                  >
                    {outfit.name}
                  </Button>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Outfit Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {OUTFIT_COLORS.map((color) => (
                    <Button
                      key={color.id}
                      variant="outline"
                      onClick={() => updateCharacter("outfitColor", color.id)}
                      className={`h-12 flex flex-col items-center justify-center ${character.outfitColor === color.id ? "ring-2 ring-white" : ""}`}
                    >
                      <div className="w-6 h-6 rounded-full mb-1" style={{ backgroundColor: color.value }} />
                      <span className="text-xs">{color.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* No reference images */}
            </TabsContent>

            {/* Preview */}
            <TabsContent value="color" className="space-y-4">
              <h3 className="text-lg font-medium">Character Preview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
                  <h4 className="mb-2">Current Character</h4>
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
                </div>

                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="mb-2">Character Stats</h4>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-yellow-500">Type:</span>{" "}
                      {CHARACTER_TYPES.find((t) => t.id === character.type)?.name}
                    </li>
                    <li>
                      <span className="text-yellow-500">Hair:</span>{" "}
                      {HAIR_STYLES.find((h) => h.id === character.hairStyle)?.name}
                    </li>
                    <li>
                      <span className="text-yellow-500">Hair Color:</span>{" "}
                      {HAIR_COLORS.find((c) => c.id === character.hairColor)?.name}
                    </li>
                    <li>
                      <span className="text-yellow-500">Skin:</span>{" "}
                      {SKIN_TONES.find((s) => s.id === character.skinTone)?.name}
                    </li>
                    <li>
                      <span className="text-yellow-500">Outfit:</span>{" "}
                      {OUTFITS.find((o) => o.id === character.outfit)?.name}
                    </li>
                    <li>
                      <span className="text-yellow-500">Outfit Color:</span>{" "}
                      {OUTFIT_COLORS.find((c) => c.id === character.outfitColor)?.name}
                    </li>
                  </ul>
                </div>
              </div>

              {/* No more character ideas section */}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-between max-w-6xl mx-auto w-full">
        <Link href="/">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </Link>

        <Link href="/powers">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2">
            Next
            <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  )
}

