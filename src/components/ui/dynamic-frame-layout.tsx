"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Frame {
  id: number
  video: string
  title?: string
  url?: string
  defaultPos: { x: number; y: number; w: number; h: number }
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize?: number
  borderThickness?: number
  borderSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  video: string
  width: number | string
  height: number | string
  className?: string
  corner?: string
  edgeHorizontal?: string
  edgeVertical?: string
  mediaSize: number
  borderThickness: number
  borderSize: number
  showFrame: boolean
  isHovered: boolean
  autoPlay?: boolean
}

function FrameComponent({
  video,
  width,
  height,
  className = "",
  corner,
  edgeHorizontal,
  edgeVertical,
  mediaSize,
  borderThickness,
  borderSize,
  showFrame,
  isHovered,
  autoPlay = false,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (autoPlay) {
      videoRef.current?.play().catch(() => {})
      return
    }
    if (isHovered) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isHovered, autoPlay])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
            padding: showFrame ? `${borderThickness}px` : "0",
            width: showFrame ? `${borderSize}%` : "100%",
            height: showFrame ? `${borderSize}%` : "100%",
            left: showFrame ? `${(100 - borderSize) / 2}%` : "0",
            top: showFrame ? `${(100 - borderSize) / 2}%` : "0",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            <video
              className="w-full h-full object-cover"
              src={video}
              loop
              muted
              playsInline
              autoPlay={autoPlay}
              ref={videoRef}
            />
          </div>
        </div>

        {showFrame && corner && edgeHorizontal && edgeVertical && (
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})` }}
            />
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleX(-1)" }}
            />
            <div
              className="absolute bottom-0 left-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scaleY(-1)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-16 h-16 bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${corner})`, transform: "scale(-1, -1)" }}
            />

            <div
              className="absolute top-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div
              className="absolute bottom-0 left-16 right-16 h-16"
              style={{
                backgroundImage: `url(${edgeHorizontal})`,
                backgroundSize: "auto 64px",
                backgroundRepeat: "repeat-x",
                transform: "rotate(180deg)",
              }}
            />
            <div
              className="absolute left-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
              }}
            />
            <div
              className="absolute right-0 top-16 bottom-16 w-16"
              style={{
                backgroundImage: `url(${edgeVertical})`,
                backgroundSize: "64px auto",
                backgroundRepeat: "repeat-y",
                transform: "scaleX(-1)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  showFrames?: boolean
  hoverSize?: number
  gapSize?: number
  autoPlay?: boolean
}

export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  showFrames = false,
  hoverSize = 6,
  gapSize = 4,
  autoPlay = false,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames)
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  // Compute grid dimensions from frame positions
  const cols = Math.max(...frames.map((f) => Math.floor(f.defaultPos.x / 4))) + 1
  const rows = Math.max(...frames.map((f) => Math.floor(f.defaultPos.y / 4))) + 1
  const totalFr = cols * 4

  const getRowSizes = () => {
    const defaultSize = Array(rows).fill("4fr").join(" ")
    if (hovered === null) return defaultSize
    const { row } = hovered
    const nonHoveredSize = (totalFr - hoverSize) / (rows - 1)
    return Array.from({ length: rows }, (_, r) =>
      r === row ? `${hoverSize}fr` : `${nonHoveredSize}fr`
    ).join(" ")
  }

  const getColSizes = () => {
    const defaultSize = Array(cols).fill("4fr").join(" ")
    if (hovered === null) return defaultSize
    const { col } = hovered
    const nonHoveredSize = (totalFr - hoverSize) / (cols - 1)
    return Array.from({ length: cols }, (_, c) =>
      c === col ? `${hoverSize}fr` : `${nonHoveredSize}fr`
    ).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === 4 ? "center" : "bottom"
    const horizontal = x === 0 ? "left" : x === 4 ? "center" : "right"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame) => {
        const row = Math.floor(frame.defaultPos.y / 4)
        const col = Math.floor(frame.defaultPos.x / 4)
        const transformOrigin = getTransformOrigin(frame.defaultPos.x, frame.defaultPos.y)
        const isCellHovered = hovered?.row === row && hovered?.col === col

        const labelContent = frame.title ? (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            initial={{ y: '100%', opacity: 0 }}
            animate={isCellHovered ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 py-2.5 pt-6">
              {frame.url ? (
                <a
                  href={frame.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-white/90 hover:text-[#c084fc] transition-colors"
                >
                  {frame.title}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                </a>
              ) : (
                <span className="text-[11px] font-medium text-white/90">{frame.title}</span>
              )}
            </div>
          </motion.div>
        ) : null

        return (
          <motion.div
            key={frame.id}
            className="relative overflow-hidden"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              video={frame.video}
              width="100%"
              height="100%"
              className="absolute inset-0"
              corner={frame.corner}
              edgeHorizontal={frame.edgeHorizontal}
              edgeVertical={frame.edgeVertical}
              mediaSize={frame.mediaSize ?? 1}
              borderThickness={frame.borderThickness ?? 0}
              borderSize={frame.borderSize ?? 100}
              showFrame={showFrames}
              isHovered={isCellHovered}
              autoPlay={autoPlay}
            />
            {labelContent}
          </motion.div>
        )
      })}
    </div>
  )
}
