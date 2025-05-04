"use client"

import { useEffect, useState } from "react"

// This component helps debug mobile sizing issues
export default function MobileDebugHelper() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    devicePixelRatio: 1,
  })

  useEffect(() => {
    // Update dimensions on mount and resize
    const updateDimensions = () => {
      setDimensions({
        width: window.screen.width,
        height: window.screen.height,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Inject CSS to force gallery item size
    const style = document.createElement("style")
    style.textContent = `
      @media (max-width: 480px) {
        .gallery-item {
          width: 424px !important; /* Exact width from screenshot */
          max-width: 100% !important;
          margin: 0 auto !important;
          transform: scale(0.95) !important; /* Slightly smaller to prevent offside */
        }
        swiper-slide {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .gallery-image {
          width: 100% !important;
          height: auto !important;
          object-fit: contain !important;
        }
        .gallery-image-wrapper {
          width: 100% !important;
        }
        .container {
          padding-left: 0 !important;
          padding-right: 0 !important;
          max-width: 100% !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      document.head.removeChild(style)
    }
  }, [])

  // Only show on mobile devices
  if (dimensions.innerWidth > 768) return null

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "8px",
        fontSize: "12px",
        zIndex: 9999,
      }}
    >
      <div>
        Screen: {dimensions.width}x{dimensions.height}
      </div>
      <div>
        Window: {dimensions.innerWidth}x{dimensions.innerHeight}
      </div>
      <div>Pixel Ratio: {dimensions.devicePixelRatio}</div>
    </div>
  )
}
