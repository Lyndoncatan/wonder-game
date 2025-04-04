import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2, Zap, Shield, Swords } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"

export default function HowToPlayPage() {
  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4 flex flex-col">
      <AudioPlayer src="/audio/background-music.mp3" />

      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-8 pixel-font text-yellow-400">HOW TO PLAY</h1>

        <div className="space-y-8">
          <section className="bg-gray-900 rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Game Overview</h2>
            </div>
            <p className="text-yellow-400/80 mb-4">
              Wonder is a turn-based battle game where you create a custom character, choose a superpower, and battle
              against an NPC opponent. Your goal is to defeat your opponent by reducing their health to zero.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">1. Create Character</h3>
                <p className="text-sm text-yellow-400/60">Customize your character's appearance</p>
              </div>
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">2. Choose Power</h3>
                <p className="text-sm text-yellow-400/60">Select one of five elemental powers</p>
              </div>
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">3. Battle</h3>
                <p className="text-sm text-yellow-400/60">Defeat your opponent in turn-based combat</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Superpowers</h2>
            </div>
            <p className="text-yellow-400/80 mb-4">
              Choose one of five elemental powers, each with unique visual effects and combat advantages:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
              <div className="bg-purple-900/30 p-3 rounded-lg border border-purple-500/50">
                <h3 className="font-bold text-purple-400">Lightning</h3>
                <p className="text-sm text-yellow-400/60">Fast attacks with stun chance</p>
              </div>
              <div className="bg-orange-900/30 p-3 rounded-lg border border-orange-500/50">
                <h3 className="font-bold text-orange-400">Fire</h3>
                <p className="text-sm text-yellow-400/60">Damage over time effects</p>
              </div>
              <div className="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500/50">
                <h3 className="font-bold text-cyan-400">Ice</h3>
                <p className="text-sm text-yellow-400/60">Slows enemy attacks</p>
              </div>
              <div className="bg-amber-900/30 p-3 rounded-lg border border-amber-500/50">
                <h3 className="font-bold text-amber-400">Rock</h3>
                <p className="text-sm text-yellow-400/60">Strong defense and heavy hits</p>
              </div>
              <div className="bg-sky-900/30 p-3 rounded-lg border border-sky-500/50">
                <h3 className="font-bold text-sky-400">Air</h3>
                <p className="text-sm text-yellow-400/60">Increased dodge chance</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Swords className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Combat</h2>
            </div>
            <p className="text-yellow-400/80 mb-4">
              Combat is turn-based. You and your opponent take turns attacking each other.
            </p>
            <div className="space-y-4">
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">Attack Types</h3>
                <ul className="list-disc list-inside space-y-2 text-yellow-400/80">
                  <li>
                    <span className="text-yellow-400 font-bold">Normal Attack:</span> Low damage, costs 10 energy
                  </li>
                  <li>
                    <span className="text-yellow-400 font-bold">Heavy Attack:</span> Medium damage, costs 20 energy
                  </li>
                  <li>
                    <span className="text-yellow-400 font-bold">Special Power:</span> High damage with unique effects,
                    costs 40 energy
                  </li>
                </ul>
              </div>
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">Energy Management</h3>
                <p className="text-yellow-400/80">
                  Energy regenerates over time. Manage your energy wisely to use your most powerful attacks at the right
                  moment.
                </p>
              </div>
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2">Difficulty Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <h4 className="font-bold text-green-400">Normal Mode</h4>
                      <p className="text-sm text-yellow-400/60">Balanced for casual players</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Swords className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="font-bold text-red-400">Hard Mode</h4>
                      <p className="text-sm text-yellow-400/60">Challenging for experienced players</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-900 rounded-lg p-6 border-2 border-yellow-500/50">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Win/Lose Conditions</h2>
            </div>
            <p className="text-yellow-400/80 mb-4">
              The battle ends when either you or your opponent's health reaches zero.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2 text-yellow-400">Victory</h3>
                <p className="text-yellow-400/80">
                  You win when your opponent's health reaches zero. You'll see a victory animation and can return to the
                  main menu.
                </p>
              </div>
              <div className="bg-black p-4 rounded-lg border border-yellow-500/50">
                <h3 className="font-bold mb-2 text-red-400">Defeat</h3>
                <p className="text-yellow-400/80">
                  You lose when your health reaches zero. You'll see a defeat animation and can try again from the main
                  menu.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
            >
              <ArrowLeft size={16} />
              Back to Menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

