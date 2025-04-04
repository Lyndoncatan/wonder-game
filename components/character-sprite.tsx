"use client"

interface CharacterSpriteProps {
  type: string
  hairStyle: string
  hairColor: string
  skinTone: string
  outfit: string
  outfitColor: string
  power: string
  isAnimated?: boolean
  size?: "small" | "medium" | "large"
}

export function CharacterSprite({
  type = "human",
  hairStyle = "short",
  hairColor = "yellow",
  skinTone = "light",
  outfit = "casual",
  outfitColor = "red",
  power = "lightning",
  isAnimated = false,
  size = "medium",
}: CharacterSpriteProps) {
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

  // Size classes
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32",
  }

  // Animation classes
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

  return (
    <div className={`relative ${sizeClasses[size]} ${animationClass} character-pixel`}>
      <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="32" height="32" fill="transparent" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fill="white">
          Character
        </text>
        <circle cx="16" cy="16" r="10" fill={powerColor} fillOpacity="0.5" />
      </svg>
    </div>
  )
}

