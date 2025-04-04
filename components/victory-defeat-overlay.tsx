interface VictoryDefeatOverlayProps {
  result: "victory" | "defeat"
}

export function VictoryDefeatOverlay({ result }: VictoryDefeatOverlayProps) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
      <div
        className={`
        text-6xl font-bold pixel-font mb-8
        ${result === "victory" ? "text-yellow-400 victory-pulse" : "text-red-500 defeat-shake"}
      `}
      >
        {result === "victory" ? "VICTORY!" : "DEFEAT!"}
      </div>

      {/* Pixel art trophy or skull based on result */}
      <div className="mb-8">
        {result === "victory" ? (
          <svg
            width="64"
            height="64"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="character-pixel"
          >
            {/* Trophy */}
            <rect x="6" y="1" width="4" height="2" fill="#FFD700" />
            <rect x="4" y="3" width="8" height="6" fill="#FFD700" />
            <rect x="6" y="9" width="4" height="4" fill="#FFD700" />
            <rect x="4" y="13" width="8" height="2" fill="#FFD700" />
          </svg>
        ) : (
          <svg
            width="64"
            height="64"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="character-pixel"
          >
            {/* Skull */}
            <rect x="5" y="3" width="6" height="6" fill="#FFFFFF" />
            <rect x="4" y="4" width="1" height="4" fill="#FFFFFF" />
            <rect x="11" y="4" width="1" height="4" fill="#FFFFFF" />
            <rect x="5" y="9" width="6" height="1" fill="#FFFFFF" />
            <rect x="6" y="10" width="1" height="2" fill="#FFFFFF" />
            <rect x="9" y="10" width="1" height="2" fill="#FFFFFF" />
            <rect x="7" y="11" width="2" height="1" fill="#FFFFFF" />
            {/* Eyes */}
            <rect x="6" y="5" width="1" height="2" fill="#000000" />
            <rect x="9" y="5" width="1" height="2" fill="#000000" />
          </svg>
        )}
      </div>

      <div className="text-xl pixel-font text-center px-4">
        {result === "victory" ? "You have defeated your opponent!" : "You have been defeated! Better luck next time."}
      </div>
    </div>
  )
}

