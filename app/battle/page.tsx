"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Swords, Zap, Home, Flame, Snowflake, Mountain, Wind } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { VictoryDefeatOverlay } from "@/components/victory-defeat-overlay"
import { CharacterSprite } from "@/components/character-sprites"

// Add a PowerImpact component at the top of the file, after the imports
const PowerImpact = ({ power, target }) => {
  return (
    <div
      className={`power-impact ${power}`}
      style={{
        left: target === "player" ? "25%" : "75%",
        transform: target === "player" ? "translateX(-50%)" : "translateX(-50%)",
      }}
    ></div>
  )
}

const BACKGROUNDS = [
  {
    id: "city-sunset",
    name: "City Sunset",
    src: "/images/backgrounds/city-sunset.png",
  },
  {
    id: "green-fields",
    name: "Green Fields",
    src: "/images/backgrounds/green-fields.png",
  },
  {
    id: "magic-forest",
    name: "Magic Forest",
    src: "/images/backgrounds/magic-forest.png",
  },
  {
    id: "mountain-graves",
    name: "Mountain Graves",
    src: "/images/backgrounds/mountain-graves.png",
  },
]

export default function BattlePage() {
  const searchParams = useSearchParams()
  const [gameState, setGameState] = useState({
    player: {
      type: "human",
      hairStyle: "short",
      hairColor: "yellow",
      skinTone: "light",
      outfit: "casual",
      outfitColor: "red",
      name: "Player",
      power: "lightning",
      health: 100,
      energy: 100,
    },
    enemy: {
      type: "human",
      hairStyle: "spiky",
      hairColor: "black",
      skinTone: "medium",
      outfit: "warrior",
      outfitColor: "purple",
      name: "Dark Warrior",
      power: "rock",
      health: 100,
      difficulty: "normal",
    },
    background: "city-sunset",
  })

  const [battleLog, setBattleLog] = useState([{ text: "Battle started! Use your powers wisely.", type: "system" }])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [gameResult, setGameResult] = useState(null) // "victory" or "defeat"
  const [specialReady, setSpecialReady] = useState(true)
  const [effectActive, setEffectActive] = useState(null)
  const [showVictoryScreen, setShowVictoryScreen] = useState(false)

  // Add these state variables after the other state declarations
  const [playerAttacking, setPlayerAttacking] = useState(false)
  const [enemyAttacking, setEnemyAttacking] = useState(false)
  const [playerHit, setPlayerHit] = useState(false)
  const [enemyHit, setEnemyHit] = useState(false)

  // This flag prevents the infinite loop by ensuring we only update state once
  const [paramsLoaded, setParamsLoaded] = useState(false)

  const battleLogRef = useRef(null)

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
        const background = searchParams.get("background")

        // Generate a random enemy power that's different from player's
        const playerPower = power || "lightning"
        const availablePowers = ["lightning", "fire", "ice", "rock", "air"].filter((p) => p !== playerPower)
        const randomEnemyPower = availablePowers[Math.floor(Math.random() * availablePowers.length)]
        const isDifficultHard = difficulty === "hard"

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
          difficulty ||
          background
        ) {
          setGameState({
            player: {
              type: characterType || "human",
              hairStyle: hairStyle || "short",
              hairColor: hairColor || "yellow",
              skinTone: skinTone || "light",
              outfit: outfit || "casual",
              outfitColor: outfitColor || "red",
              name: name || "Player",
              power: playerPower,
              health: 100,
              energy: 100,
            },
            enemy: {
              type: "human",
              hairStyle: "spiky",
              hairColor: "black",
              skinTone: "medium",
              outfit: "warrior",
              outfitColor: "purple",
              name: isDifficultHard ? "Elite Warrior" : "Dark Warrior",
              power: randomEnemyPower,
              health: isDifficultHard ? 120 : 100,
              difficulty: difficulty || "normal",
            },
            background: background || "city-sunset",
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

  // Scroll battle log to bottom when updated
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight
    }
  }, [battleLog])

  // Modify the Enemy AI turn effect to include animation
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        // Start enemy attack animation
        setEnemyAttacking(true)

        setTimeout(() => {
          // Hard mode does more damage
          const baseDamage = gameState.enemy.difficulty === "hard" ? 10 : 5
          const damage = Math.floor(Math.random() * 15) + baseDamage
          const isCritical = Math.random() > 0.8
          const actualDamage = isCritical ? Math.floor(damage * 1.5) : damage

          // Apply damage to player
          setGameState((prev) => ({
            ...prev,
            player: {
              ...prev.player,
              health: Math.max(0, prev.player.health - actualDamage),
            },
          }))

          // Show hit effect on player
          setPlayerHit(true)
          setTimeout(() => setPlayerHit(false), 300)

          // End enemy attack animation
          setEnemyAttacking(false)

          // Add to battle log
          setBattleLog((prev) => [
            ...prev,
            {
              text: `Enemy attacks with ${gameState.enemy.power} power${isCritical ? " (CRITICAL HIT)" : ""} for ${actualDamage} damage!`,
              type: "enemy",
            },
          ])

          // Check if player is defeated
          if (gameState.player.health - actualDamage <= 0) {
            setGameOver(true)
            setGameResult("defeat")
            setBattleLog((prev) => [...prev, { text: "You have been defeated!", type: "system" }])

            // Show victory/defeat screen after a delay
            setTimeout(() => {
              setShowVictoryScreen(true)
            }, 1000)
          } else {
            // Back to player's turn
            setIsPlayerTurn(true)
          }
        }, 500) // Time for enemy to move forward before hit
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, gameOver, gameState.enemy.power, gameState.enemy.difficulty])

  // Modify the handleAttack function to include animation
  const handleAttack = (attackType) => {
    if (!isPlayerTurn || gameOver) return

    let damage, energyCost, logText

    // Start player attack animation
    setPlayerAttacking(true)

    setTimeout(() => {
      if (attackType === "normal") {
        damage = Math.floor(Math.random() * 10) + 5
        energyCost = 10
        logText = `You attack with a normal ${gameState.player.power} strike for ${damage} damage!`
      } else if (attackType === "heavy") {
        damage = Math.floor(Math.random() * 15) + 10
        energyCost = 20
        logText = `You unleash a heavy ${gameState.player.power} attack for ${damage} damage!`
      } else if (attackType === "special") {
        damage = Math.floor(Math.random() * 25) + 15
        energyCost = 40
        logText = `You unleash your SPECIAL ${gameState.player.power.toUpperCase()} POWER for ${damage} damage!`
        setSpecialReady(false)

        // Show special effect
        setEffectActive(gameState.player.power)
        setTimeout(() => setEffectActive(null), 1000)
      }

      // Apply damage to enemy
      setGameState((prev) => ({
        ...prev,
        player: {
          ...prev.player,
          energy: Math.max(0, prev.player.energy - energyCost),
        },
        enemy: {
          ...prev.enemy,
          health: Math.max(0, prev.enemy.health - damage),
        },
      }))

      // Show hit effect on enemy
      setEnemyHit(true)
      setTimeout(() => setEnemyHit(false), 300)

      // End player attack animation
      setPlayerAttacking(false)

      // Add to battle log
      setBattleLog((prev) => [...prev, { text: logText, type: "player" }])

      // Check if enemy is defeated
      if (gameState.enemy.health - damage <= 0) {
        setGameOver(true)
        setGameResult("victory")
        setBattleLog((prev) => [...prev, { text: "Victory! You defeated the enemy!", type: "system" }])

        // Show victory/defeat screen after a delay
        setTimeout(() => {
          setShowVictoryScreen(true)
        }, 1000)
      } else {
        // Enemy turn
        setIsPlayerTurn(false)
      }
    }, 500) // Time for player to move forward before hit
  }

  // Regenerate energy over time
  useEffect(() => {
    if (!gameOver) {
      const energyTimer = setInterval(() => {
        setGameState((prev) => ({
          ...prev,
          player: {
            ...prev.player,
            energy: Math.min(100, prev.player.energy + 5),
          },
        }))
      }, 2000)

      return () => clearInterval(energyTimer)
    }
  }, [gameOver])

  // Get the current background image
  const backgroundImage = BACKGROUNDS.find((bg) => bg.id === gameState.background)?.src || BACKGROUNDS[0].src

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4 flex flex-col">
      <AudioPlayer src="/audio/background-music.mp3" />

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        {/* Battle Arena */}
        <div className="relative h-80 bg-gray-900 rounded-lg overflow-hidden pixel-border mb-4">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="Battle background"
              fill
              className="object-cover pixelated"
            />
          </div>

          {/* Victory/Defeat Overlay */}
          {showVictoryScreen && <VictoryDefeatOverlay result={gameResult} />}

          {/* Special Effect Overlay */}
          {effectActive && (
            <div className={`absolute inset-0 z-10 power-${effectActive} flex items-center justify-center`}>
              <div className={`text-6xl font-bold animate-pulse`}>
                {effectActive === "lightning" && "⚡⚡⚡"}
                {effectActive === "fire" && "🔥🔥🔥"}
                {effectActive === "ice" && "❄️❄️❄️"}
                {effectActive === "rock" && "🪨🪨🪨"}
                {effectActive === "air" && "💨💨💨"}
              </div>
            </div>
          )}

          {/* Power Impact Effects */}
          {playerHit && <PowerImpact power={gameState.enemy.power} target="player" />}
          {enemyHit && <PowerImpact power={gameState.player.power} target="enemy" />}

          {/* Player Character */}
          <div
            className={`absolute bottom-4 left-1/4 transform -translate-x-1/2 z-10 transition-all duration-300 
                        ${playerAttacking ? "player-attacking" : ""}`}
          >
            <div className={`relative ${playerHit ? "hit-effect" : ""}`}>
              <div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full 
                              flex items-center justify-center power-${gameState.player.power} bg-purple-700"
              >
                {gameState.player.power === "lightning" && <Zap className="w-4 h-4 text-white" />}
                {gameState.player.power === "fire" && <Flame className="w-4 h-4 text-white" />}
                {gameState.player.power === "ice" && <Snowflake className="w-4 h-4 text-white" />}
                {gameState.player.power === "rock" && <Mountain className="w-4 h-4 text-white" />}
                {gameState.player.power === "air" && <Wind className="w-4 h-4 text-white" />}
              </div>
              <CharacterSprite
                type={gameState.player.type}
                hairStyle={gameState.player.hairStyle}
                hairColor={gameState.player.hairColor}
                skinTone={gameState.player.skinTone}
                outfit={gameState.player.outfit}
                outfitColor={gameState.player.outfitColor}
                power={gameState.player.power}
                isAnimated={gameOver && gameResult === "victory"}
                size="medium"
              />
            </div>
          </div>

          {/* Enemy Character */}
          <div
            className={`absolute bottom-4 right-1/4 transform translate-x-1/2 z-10 transition-all duration-300 
                        ${enemyAttacking ? "enemy-attacking" : ""}`}
          >
            <div className={`relative ${enemyHit ? "hit-effect" : ""}`}>
              <div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full 
                              flex items-center justify-center power-${gameState.enemy.power} bg-amber-700"
              >
                {gameState.enemy.power === "lightning" && <Zap className="w-4 h-4 text-white" />}
                {gameState.enemy.power === "fire" && <Flame className="w-4 h-4 text-white" />}
                {gameState.enemy.power === "ice" && <Snowflake className="w-4 h-4 text-white" />}
                {gameState.enemy.power === "rock" && <Mountain className="w-4 h-4 text-white" />}
                {gameState.enemy.power === "air" && <Wind className="w-4 h-4 text-white" />}
              </div>
              <CharacterSprite
                type={gameState.enemy.type}
                hairStyle={gameState.enemy.hairStyle}
                hairColor={gameState.enemy.hairColor}
                skinTone={gameState.enemy.skinTone}
                outfit={gameState.enemy.outfit}
                outfitColor={gameState.enemy.outfitColor}
                power={gameState.enemy.power}
                isAnimated={gameOver && gameResult === "defeat"}
                size="medium"
              />
            </div>
          </div>
        </div>

        {/* Battle UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Player Stats */}
          <div className="bg-gray-900 border-2 border-yellow-500/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{gameState.player.name}</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span>HP</span>
                  <span>{gameState.player.health}/100</span>
                </div>
                <Progress value={gameState.player.health} className="h-2 bg-gray-700">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{ width: `${gameState.player.health}%` }}
                  />
                </Progress>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Energy</span>
                  <span>{gameState.player.energy}/100</span>
                </div>
                <Progress value={gameState.player.energy} className="h-2 bg-gray-700">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-500"
                    style={{ width: `${gameState.player.energy}%` }}
                  />
                </Progress>
              </div>
            </div>
          </div>

          {/* Battle Log */}
          <div className="bg-gray-900 border-2 border-yellow-500/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Battle Log</h3>
            <div ref={battleLogRef} className="h-32 overflow-y-auto text-sm space-y-1 bg-black p-2 rounded">
              {battleLog.map((log, index) => (
                <div
                  key={index}
                  className={`${
                    log.type === "player" ? "text-yellow-400" : log.type === "enemy" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {log.text}
                </div>
              ))}
            </div>
          </div>

          {/* Enemy Stats */}
          <div className="bg-gray-900 border-2 border-yellow-500/50 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">{gameState.enemy.name}</h3>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span>HP</span>
                  <span>
                    {gameState.enemy.health}/{gameState.enemy.difficulty === "hard" ? 120 : 100}
                  </span>
                </div>
                <Progress
                  value={gameState.enemy.health}
                  max={gameState.enemy.difficulty === "hard" ? 120 : 100}
                  className="h-2 bg-gray-700"
                >
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{
                      width: `${(gameState.enemy.health / (gameState.enemy.difficulty === "hard" ? 120 : 100)) * 100}%`,
                    }}
                  />
                </Progress>
              </div>
              <div className="flex items-center gap-2">
                <span>Difficulty:</span>
                <span className={gameState.enemy.difficulty === "normal" ? "text-green-400" : "text-red-400"}>
                  {gameState.enemy.difficulty === "normal" ? (
                    <Shield className="w-4 h-4 inline" />
                  ) : (
                    <Swords className="w-4 h-4 inline" />
                  )}{" "}
                  {gameState.enemy.difficulty.charAt(0).toUpperCase() + gameState.enemy.difficulty.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button
            onClick={() => handleAttack("normal")}
            disabled={!isPlayerTurn || gameOver || gameState.player.energy < 10}
            className="bg-yellow-600 hover:bg-yellow-700 text-black"
          >
            Normal Attack (10 Energy)
          </Button>
          <Button
            onClick={() => handleAttack("heavy")}
            disabled={!isPlayerTurn || gameOver || gameState.player.energy < 20}
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Heavy Attack (20 Energy)
          </Button>
          <Button
            onClick={() => handleAttack("special")}
            disabled={!isPlayerTurn || gameOver || gameState.player.energy < 40 || !specialReady}
            className={`${
              gameState.player.power === "lightning"
                ? "bg-purple-500 hover:bg-purple-600"
                : gameState.player.power === "fire"
                  ? "bg-orange-500 hover:bg-orange-600"
                  : gameState.player.power === "ice"
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : gameState.player.power === "rock"
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-sky-500 hover:bg-sky-600"
            } text-black`}
          >
            Special Power (40 Energy)
          </Button>

          {gameOver && (
            <Link href="/" className="flex items-center justify-center">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold w-full">
                <Home className="w-4 h-4 mr-2" /> Return to Menu
              </Button>
            </Link>
          )}
        </div>

        {/* Game Status */}
        {!gameOver && (
          <div className="mt-4 text-center">
            <h3 className="text-xl pixel-font">{isPlayerTurn ? "YOUR TURN" : "ENEMY TURN"}</h3>
          </div>
        )}
      </div>
    </div>
  )
}

