'use client'

import { useRef, useEffect } from 'react'
import { publications, type Publication } from '@/data/publications'

function highlightName(authors: string) {
  return authors.split(/(Junjie Wen\*?)/).map((part, i) =>
    part.match(/Junjie Wen/) ? (
      <span key={i} className="text-[#c084fc] font-bold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function MiniVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? el.play().catch(() => {}) : el.pause() },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video ref={ref} src={src} muted loop playsInline className="w-full h-full object-contain bg-black" />
  )
}

function PubCard({ pub }: { pub: Publication }) {
  const hasMedia = pub.video || pub.image

  return (
    <div className="group flex gap-4 p-4 rounded-lg border border-white/5 hover:border-[#c084fc]/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
      {/* Left: mini demo */}
      <div className="w-32 h-24 flex-shrink-0 rounded-md overflow-hidden bg-white/5 border border-white/5">
        {pub.video ? (
          <MiniVideo src={pub.video} />
        ) : pub.image ? (
          <img src={pub.image} alt={pub.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-700 text-[10px]">
            No demo
          </div>
        )}
      </div>

      {/* Right: info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`px-2 py-0.5 text-[10px] rounded-full border ${
            pub.venue.includes("Oral")
              ? "text-[#c084fc] bg-[#c084fc]/10 border-[#c084fc]/30 font-medium"
              : "bg-white/10 text-white/70 border-white/10"
          }`}>
            {pub.venue}
          </span>
          {pub.highlight && (
            <span className="px-2 py-0.5 text-[10px] text-purple-300/80 bg-purple-500/10 rounded-full border border-purple-500/20">
              1st Author
            </span>
          )}
          {pub.citations && (
            <span className="px-2 py-0.5 text-[10px] text-amber-300/80 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              {pub.citations} citations
            </span>
          )}
        </div>
        <h4 className="text-sm font-medium text-white/90 leading-snug mb-1 group-hover:text-white transition-colors line-clamp-2">
          {pub.title}
        </h4>
        <p className="text-[11px] text-neutral-500 leading-relaxed mb-2 line-clamp-1">
          {highlightName(pub.authors)}
        </p>
        {pub.links && (
          <div className="flex gap-2">
            {pub.links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-[11px] font-medium text-white/70 bg-white/5 border border-white/10 rounded-md hover:bg-[#c084fc]/10 hover:text-[#c084fc] hover:border-[#c084fc]/30 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function PublicationList() {
  const years = [...new Set(publications.map((p) => p.year))].sort((a, b) => Number(b) - Number(a))

  return (
    <div>
      {years.map((year) => (
        <div key={year} className="mb-8">
          <h3 className="text-sm font-semibold text-[#c084fc]/40 mb-4 pb-2 border-b border-white/5">
            {year}
          </h3>
          <div className="space-y-3">
            {publications
              .filter((p) => p.year === year)
              .map((pub) => (
                <PubCard key={pub.title} pub={pub} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
