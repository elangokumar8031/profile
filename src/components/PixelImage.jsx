import React, { useEffect, useMemo, useState, useRef } from "react"
import { useInView } from "framer-motion"

const DEFAULT_GRIDS = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

export function PixelImage({
  src,
  alt = "Pixel image",
  grid = "6x4",
  grayscaleAnimation = true,
  pixelFadeInDuration = 400,
  maxAnimationDelay = 400,
  colorRevealDelay = 500,
  customGrid,
  className,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const containerRef = useRef(null)
  
  // Trigger animation when the component is scrolled into view!
  const isInView = useInView(containerRef, { once: true, amount: 0.15 })

  const MIN_GRID = 1
  const MAX_GRID = 16

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (g) => {
      if (!g) return false
      const { rows, cols } = g
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
      const colorTimeout = setTimeout(() => {
        setShowColor(true)
      }, colorRevealDelay)
      return () => clearTimeout(colorTimeout)
    }
  }, [isInView, colorRevealDelay])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const clipPath = `polygon(
        ${col * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${row * (100 / rows)}%,
        ${(col + 1) * (100 / cols)}% ${(row + 1) * (100 / rows)}%,
        ${col * (100 / cols)}% ${(row + 1) * (100 / rows)}%
      )`

      const delay = Math.random() * maxAnimationDelay
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full select-none overflow-hidden ${className || ""}`}
    >
      {/* Seamless Solid Base Image (Fades in on animation completion to hide sub-pixel clipPath gaps) */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-[600ms] ease-out z-10 ${
          showColor ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />

      {pieces.map((piece, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-all ease-out z-0"
          style={{
            clipPath: piece.clipPath,
            opacity: isVisible ? 1 : 0,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`${alt} piece ${index + 1}`}
            className={`w-full h-full object-cover object-top transition-all duration-[600ms] ${
              grayscaleAnimation && !showColor ? "grayscale" : "grayscale-0"
            }`}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}
