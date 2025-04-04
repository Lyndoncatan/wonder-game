interface SimpleCharacterProps {
  color: string
  isPlayer?: boolean
  size?: "small" | "medium" | "large"
  power?: string
  isAnimated?: boolean
}

export function SimpleCharacter({
  color = "#FFD700",
  isPlayer = true,
  size = "medium",
  power = "",
  isAnimated = false,
}: SimpleCharacterProps) {
  // Size classes
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  }

  // Animation classes based on power
  const animationClass = isAnimated
    ? power === "lightning"
      ? "animate-pulse"
      : power === "fire"
        ? "animate-bounce"
        : power === "ice"
          ? "animate-pulse"
          : power === "rock"
            ? "animate-none"
            : "animate-pulse"
    : ""

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
  const eyeColor = "#000000"
  const mouthColor = "#000000"

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass} character-pixel`}>
      <svg width="100%" height="100%" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <rect x="4" y="2" width="8" height="2" fill={color} />

        {/* Eyes */}
        <rect x="5" y="3" width="1" height="1" fill={eyeColor} />
        <rect x="10" y="3" width="1" height="1" fill={eyeColor} />

        {/* Mouth */}
        <rect x="6" y="5" width="4" height="1" fill={mouthColor} />

        {/* Body */}
        <rect x="6" y="7" width="4" height="3" fill={color} />

        {/* Arms */}
        <rect x="4" y="8" width="2" height="1" fill={color} />
        <rect x="10" y="8" width="2" height="1" fill={color} />

        {/* Legs */}
        <rect x="6" y="10" width="1" height="4" fill={color} />
        <rect x="9" y="10" width="1" height="4" fill={color} />

        {/* Power aura (if power is specified) */}
        {power && (
          <>
            <rect x="3" y="3" width="1" height="6" fill={powerColor} fillOpacity="0.5" />
            <rect x="12" y="3" width="1" height="6" fill={powerColor} fillOpacity="0.5" />
          </>
        )}
      </svg>
    </div>
  )
}

