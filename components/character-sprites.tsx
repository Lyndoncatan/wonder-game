// Character sprite data for different character types
export const CHARACTER_TYPES = [
  { id: "human", name: "Human" },
  { id: "cat", name: "Cat" },
  { id: "animal", name: "Animal" },
]

// Hair styles
export const HAIR_STYLES = [
  { id: "short", name: "Short" },
  { id: "medium", name: "Medium" },
  { id: "long", name: "Long" },
  { id: "spiky", name: "Spiky" },
  { id: "hat", name: "Hat" },
  { id: "none", name: "None" },
]

// Hair colors with actual color values
export const HAIR_COLORS = [
  { id: "black", name: "Black", value: "#111111" },
  { id: "yellow", name: "Yellow", value: "#FFD700" },
  { id: "orange", name: "Orange", value: "#FF8C00" },
  { id: "red", name: "Red", value: "#FF4500" },
  { id: "blue", name: "Blue", value: "#1E90FF" },
  { id: "green", name: "Green", value: "#32CD32" },
  { id: "purple", name: "Purple", value: "#9370DB" },
  { id: "white", name: "White", value: "#FFFFFF" },
]

// Skin tones with actual color values
export const SKIN_TONES = [
  { id: "light", name: "Light", value: "#FFE0BD" },
  { id: "medium", name: "Medium", value: "#D8AD8F" },
  { id: "dark", name: "Dark", value: "#8D5524" },
  { id: "fantasy", name: "Fantasy", value: "#C0FFEE" },
]

// Outfit styles
export const OUTFITS = [
  { id: "casual", name: "Casual" },
  { id: "warrior", name: "Warrior" },
  { id: "mage", name: "Mage" },
  { id: "ninja", name: "Ninja" },
]

// Outfit colors
export const OUTFIT_COLORS = [
  { id: "black", name: "Black", value: "#111111" },
  { id: "yellow", name: "Yellow", value: "#FFD700" },
  { id: "orange", name: "Orange", value: "#FF8C00" },
  { id: "red", name: "Red", value: "#FF4500" },
  { id: "blue", name: "Blue", value: "#1E90FF" },
  { id: "green", name: "Green", value: "#32CD32" },
  { id: "purple", name: "Purple", value: "#9370DB" },
  { id: "white", name: "White", value: "#FFFFFF" },
]

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
  // Ensure all inputs are strings
  const safeType = typeof type === "string" ? type : "human"
  const safeHairStyle = typeof hairStyle === "string" ? hairStyle : "short"
  const safeHairColor = typeof hairColor === "string" ? hairColor : "yellow"
  const safeSkinTone = typeof skinTone === "string" ? skinTone : "light"
  const safeOutfit = typeof outfit === "string" ? outfit : "casual"
  const safeOutfitColor = typeof outfitColor === "string" ? outfitColor : "red"
  const safePower = typeof power === "string" ? power : "lightning"

  // Get actual color values from the color IDs
  const hairColorObj = HAIR_COLORS.find((c) => c.id === safeHairColor)
  const skinToneObj = SKIN_TONES.find((s) => s.id === safeSkinTone)
  const outfitColorObj = OUTFIT_COLORS.find((c) => c.id === safeOutfitColor)

  const hairColorValue = hairColorObj?.value || "#FFD700"
  const skinToneValue = skinToneObj?.value || "#FFE0BD"
  const outfitColorValue = outfitColorObj?.value || "#FF4500"

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

  // Render different character types
  if (type === "cat") {
    return (
      <div className={`relative ${sizeClasses[size]} ${animationClass} character-pixel`}>
        <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Cat body */}
          <rect x="8" y="12" width="16" height="12" fill={hairColorValue} />
          <rect x="6" y="14" width="2" height="8" fill={hairColorValue} />
          <rect x="24" y="14" width="2" height="8" fill={hairColorValue} />
          <rect x="8" y="24" width="4" height="2" fill={hairColorValue} />
          <rect x="20" y="24" width="4" height="2" fill={hairColorValue} />

          {/* Cat ears */}
          <rect x="6" y="8" width="4" height="4" fill={hairColorValue} />
          <rect x="22" y="8" width="4" height="4" fill={hairColorValue} />
          <rect x="8" y="6" width="2" height="2" fill={hairColorValue} />
          <rect x="22" y="6" width="2" height="2" fill={hairColorValue} />

          {/* Cat face */}
          <rect x="10" y="16" width="2" height="2" fill="#000000" />
          <rect x="20" y="16" width="2" height="2" fill="#000000" />
          <rect x="14" y="18" width="4" height="2" fill="#000000" />

          {/* Cat belly */}
          <rect x="12" y="20" width="8" height="4" fill={skinToneValue} />

          {/* Power aura */}
          <rect x="4" y="10" width="2" height="12" fill={powerColor} fillOpacity="0.5" />
          <rect x="26" y="10" width="2" height="12" fill={powerColor} fillOpacity="0.5" />
        </svg>
      </div>
    )
  } else if (type === "animal") {
    return (
      <div className={`relative ${sizeClasses[size]} ${animationClass} character-pixel`}>
        <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Animal body */}
          <rect x="8" y="10" width="16" height="14" fill={hairColorValue} />
          <rect x="6" y="12" width="2" height="10" fill={hairColorValue} />
          <rect x="24" y="12" width="2" height="10" fill={hairColorValue} />
          <rect x="8" y="24" width="4" height="2" fill={hairColorValue} />
          <rect x="20" y="24" width="4" height="2" fill={hairColorValue} />

          {/* Animal ears/horns based on outfit */}
          {outfit === "warrior" && (
            <>
              <rect x="6" y="6" width="4" height="4" fill={outfitColorValue} />
              <rect x="22" y="6" width="4" height="4" fill={outfitColorValue} />
            </>
          )}

          {outfit === "mage" && (
            <>
              <rect x="12" y="4" width="8" height="6" fill={outfitColorValue} />
            </>
          )}

          {outfit === "ninja" && (
            <>
              <rect x="8" y="6" width="16" height="4" fill={outfitColorValue} />
            </>
          )}

          {outfit === "casual" && (
            <>
              <rect x="6" y="8" width="4" height="4" fill={hairColorValue} />
              <rect x="22" y="8" width="4" height="4" fill={hairColorValue} />
            </>
          )}

          {/* Animal face */}
          <rect x="10" y="14" width="3" height="3" fill="#000000" />
          <rect x="19" y="14" width="3" height="3" fill="#000000" />
          <rect x="13" y="19" width="6" height="2" fill="#000000" />

          {/* Animal belly */}
          <rect x="12" y="16" width="8" height="6" fill={skinToneValue} />

          {/* Power aura */}
          <rect x="4" y="14" width="2" height="8" fill={powerColor} fillOpacity="0.5" />
          <rect x="26" y="14" width="2" height="8" fill={powerColor} fillOpacity="0.5" />
        </svg>
      </div>
    )
  } else {
    // Redesigned human character - more blocky and pixel-art style
    return (
      <div className={`relative ${sizeClasses[size]} ${animationClass} character-pixel`}>
        <svg width="100%" height="100%" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          {/* Body */}
          <rect x="10" y="14" width="12" height="10" fill={outfitColorValue} />

          {/* Legs */}
          <rect x="10" y="24" width="4" height="6" fill="#111111" />
          <rect x="18" y="24" width="4" height="6" fill="#111111" />

          {/* Arms */}
          <rect x="6" y="16" width="4" height="4" fill={skinToneValue} />
          <rect x="22" y="16" width="4" height="4" fill={skinToneValue} />

          {/* Head */}
          <rect x="10" y="6" width="12" height="8" fill={skinToneValue} />

          {/* Eyes */}
          <rect x="12" y="9" width="2" height="2" fill="#000000" />
          <rect x="18" y="9" width="2" height="2" fill="#000000" />

          {/* Mouth */}
          <rect x="14" y="12" width="4" height="1" fill="#000000" />

          {/* Hair based on style */}
          {hairStyle === "short" && <rect x="10" y="4" width="12" height="2" fill={hairColorValue} />}

          {hairStyle === "medium" && (
            <>
              <rect x="8" y="4" width="16" height="2" fill={hairColorValue} />
              <rect x="8" y="6" width="2" height="6" fill={hairColorValue} />
              <rect x="22" y="6" width="2" height="6" fill={hairColorValue} />
            </>
          )}

          {hairStyle === "long" && (
            <>
              <rect x="8" y="4" width="16" height="2" fill={hairColorValue} />
              <rect x="8" y="6" width="2" height="12" fill={hairColorValue} />
              <rect x="22" y="6" width="2" height="12" fill={hairColorValue} />
            </>
          )}

          {hairStyle === "spiky" && (
            <>
              <rect x="10" y="2" width="2" height="4" fill={hairColorValue} />
              <rect x="14" y="2" width="2" height="4" fill={hairColorValue} />
              <rect x="18" y="2" width="2" height="4" fill={hairColorValue} />
              <rect x="12" y="4" width="8" height="2" fill={hairColorValue} />
            </>
          )}

          {hairStyle === "hat" && (
            <>
              <rect x="8" y="2" width="16" height="2" fill={hairColorValue} />
              <rect x="10" y="4" width="12" height="2" fill={hairColorValue} />
            </>
          )}

          {/* Outfit details based on style */}
          {outfit === "warrior" && (
            <>
              <rect x="10" y="14" width="12" height="2" fill="#888888" /> {/* Armor */}
              <rect x="14" y="16" width="4" height="8" fill="#CCCCCC" /> {/* Breastplate */}
            </>
          )}

          {outfit === "mage" && (
            <>
              <rect x="8" y="14" width="16" height="2" fill={outfitColorValue} /> {/* Robe shoulders */}
              <rect x="8" y="16" width="2" height="8" fill={outfitColorValue} /> {/* Robe left */}
              <rect x="22" y="16" width="2" height="8" fill={outfitColorValue} /> {/* Robe right */}
            </>
          )}

          {outfit === "ninja" && (
            <>
              <rect x="12" y="12" width="8" height="2" fill="#111111" /> {/* Mask */}
              <rect x="10" y="14" width="12" height="2" fill="#444444" /> {/* Belt */}
            </>
          )}

          {/* Power aura */}
          <rect x="6" y="8" width="2" height="8" fill={powerColor} fillOpacity="0.5" />
          <rect x="24" y="8" width="2" height="8" fill={powerColor} fillOpacity="0.5" />
          <rect x="8" y="6" width="2" height="2" fill={powerColor} fillOpacity="0.5" />
          <rect x="22" y="6" width="2" height="2" fill={powerColor} fillOpacity="0.5" />
        </svg>
      </div>
    )
  }
}

