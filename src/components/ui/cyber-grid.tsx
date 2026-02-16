'use client'

export function CyberGrid({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      {/* Perspective grid floor */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(192, 132, 252, 0.03) 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 99px,
              rgba(192, 132, 252, 0.04) 99px,
              rgba(192, 132, 252, 0.04) 100px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 99px,
              rgba(192, 132, 252, 0.04) 99px,
              rgba(192, 132, 252, 0.04) 100px
            )
          `,
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.08) 2px,
            rgba(0, 0, 0, 0.08) 4px
          )`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%)',
        }}
      />
    </div>
  )
}
