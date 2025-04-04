interface PixelCharacterProps {
  type: "player" | "enemy"
  power: string
  isAnimated?: boolean
}

export function PixelCharacter({ type, power, isAnimated = false }: PixelCharacterProps) {
  // Character colors based on type
  const mainColor = type === "player" ? "#FFD700" : "#FF4500"
  const secondaryColor = type === "player" ? "#000000" : "#8B0000"

  // Power color
  const getPowerColor = () => {
    switch (power) {
      case "lightning":
        return "#9966FF"
      case "fire":
        return "#FF6600"
      case "ice":
        return "#00CCFF"
      case "rock":
        return "#CC9900"
      case "air":
        return "#99FFFF"
      default:
        return "#FFFFFF"
    }
  }

  const powerColor = getPowerColor()

  return (
    <div
      className={`w-24 h-32 relative character-pixel ${isAnimated ? (type === "player" ? "victory-pulse" : "defeat-shake") : ""}`}
    >
      {/* Character Canvas */}
      <svg width="100%" height="100%" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <rect x="8" y="2" width="8" height="8" fill={mainColor} />
        <rect x="6" y="4" width="2" height="2" fill={mainColor} />
        <rect x="16" y="4" width="2" height="2" fill={mainColor} />

        {/* Eyes */}
        <rect x="8" y="4" width="2" height="2" fill={secondaryColor} />
        <rect x="14" y="4" width="2" height="2" fill={secondaryColor} />

        {/* Mouth */}
        <rect x="10" y="7" width="4" height="1" fill={secondaryColor} />

        {/* Body */}
        <rect x="8" y="10" width="8" height="10" fill={mainColor} />

        {/* Arms */}
        <rect x="4" y="12" width="4" height="2" fill={mainColor} />
        <rect x="16" y="12" width="4" height="2" fill={mainColor} />

        {/* Legs */}
        <rect x="8" y="20" width="3" height="10" fill={mainColor} />
        <rect x="13" y="20" width="3" height="10" fill={mainColor} />

        {/* Power Aura */}
        <rect x="7" y="1" width="10" height="1" fill={powerColor} opacity="0.8" />
        <rect x="6" y="2" width="1" height="2" fill={powerColor} opacity="0.8" />
        <rect x="17" y="2" width="1" height="2" fill={powerColor} opacity="0.8" />
        <rect x="5" y="10" width="1" height="2" fill={powerColor} opacity="0.8" />
        <rect x="18" y="10" width="1" height="2" fill={powerColor} opacity="0.8" />
      </svg>
    </div>
  )
}

