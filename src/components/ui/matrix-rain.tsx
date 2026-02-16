'use client'

import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  className?: string
  color?: string
  charset?: string
  fontSize?: number
  speed?: number
  opacity?: number
}

export function MatrixRain({
  className = '',
  color = '#c084fc',
  charset = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF',
  fontSize = 14,
  speed = 0.5,
  opacity = 0.15,
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let columns: number[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      const colCount = Math.floor(canvas.offsetWidth / fontSize)
      columns = Array.from({ length: colCount }, () =>
        Math.random() * -canvas.offsetHeight / fontSize
      )
    }

    resize()
    window.addEventListener('resize', resize)

    const chars = charset.split('')

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = columns[i] * fontSize

        // Brighter head character
        ctx.fillStyle = color
        ctx.globalAlpha = 0.8
        ctx.fillText(char, x, y)

        // Trail characters are dimmer
        ctx.globalAlpha = 0.3
        const trailChar = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(trailChar, x, y - fontSize)

        ctx.globalAlpha = 1

        if (y > canvas.offsetHeight && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i] += speed
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [color, charset, fontSize, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity }}
    />
  )
}
