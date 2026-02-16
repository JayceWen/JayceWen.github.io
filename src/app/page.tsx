'use client'

import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { MatrixRain } from "@/components/ui/matrix-rain"
import { CyberGrid } from "@/components/ui/cyber-grid"
import { DemoGallery } from "@/components/ui/demo-gallery"
import { PublicationList } from "@/components/ui/publication-list"
import { Github, GraduationCap, Mail } from "lucide-react"

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const NAV_ITEMS = [
  { id: 'demos', label: 'Demos', planet: 'sun' as const },
  { id: 'highlights', label: 'Highlights', planet: 'earth' as const },
  { id: 'publications', label: 'Papers', planet: 'saturn' as const },
]

// Cumulative pixel offsets mimicking solar system distances (Sun→Earth close, Earth→Saturn far)
const PLANET_OFFSETS = [0, 80, 280]

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <defs>
        <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="30%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <filter id="sunGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="9" cy="9" r="6" fill="url(#sunGrad)" filter={active ? "url(#sunGlow)" : undefined} />
      {/* Corona rays */}
      {active && [0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1={9 + Math.cos(angle * Math.PI / 180) * 6.5}
          y1={9 + Math.sin(angle * Math.PI / 180) * 6.5}
          x2={9 + Math.cos(angle * Math.PI / 180) * 8.5}
          y2={9 + Math.sin(angle * Math.PI / 180) * 8.5}
          stroke="#fbbf24" strokeWidth="0.8" opacity="0.6" strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

function EarthIcon({ active }: { active: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14">
      <defs>
        <radialGradient id="earthGrad" cx="40%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </radialGradient>
        <filter id="earthGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx="7" cy="7" r="5.5" fill="url(#earthGrad)" filter={active ? "url(#earthGlow)" : undefined} />
      {/* Continents */}
      <path d="M5 4.5Q6 3.5 7.5 4Q8 4.5 7.5 5.5Q6.5 6 5.5 5.5Q5 5 5 4.5Z" fill="#4ade80" opacity="0.7" />
      <path d="M8 6.5Q9 6 9.5 7Q9 8 8 8Q7.5 7.5 8 6.5Z" fill="#4ade80" opacity="0.6" />
      <path d="M4.5 7Q5.5 6.5 6 7.5Q5.5 8.5 4.5 8Q4 7.5 4.5 7Z" fill="#4ade80" opacity="0.5" />
      {/* Atmosphere rim */}
      <circle cx="7" cy="7" r="5.5" fill="none" stroke={active ? "#60a5fa" : "#ffffff20"} strokeWidth="0.5" />
    </svg>
  )
}

function SaturnIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16">
      <defs>
        <radialGradient id="saturnGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#d4a056" />
          <stop offset="100%" stopColor="#92400e" />
        </radialGradient>
        <filter id="saturnGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Ring - back part */}
      <ellipse cx="11" cy="8" rx="10" ry="3" fill="none" stroke="#d4a056" strokeWidth="1.2" opacity="0.3"
        strokeDasharray="0 15.7 15.7 0" />
      {/* Planet body */}
      <circle cx="11" cy="8" r="4.5" fill="url(#saturnGrad)" filter={active ? "url(#saturnGlow)" : undefined} />
      {/* Bands */}
      <path d="M6.8 7h8.4" stroke="#b8860b" strokeWidth="0.4" opacity="0.3" />
      <path d="M6.6 8.5h8.8" stroke="#b8860b" strokeWidth="0.3" opacity="0.25" />
      {/* Ring - front part */}
      <ellipse cx="11" cy="8" rx="10" ry="3" fill="none" stroke={active ? "#fbbf24" : "#d4a056"} strokeWidth="1.2"
        opacity={active ? "0.7" : "0.4"}
        strokeDasharray="15.7 15.7" />
      {/* Ring inner */}
      <ellipse cx="11" cy="8" rx="7.5" ry="2.2" fill="none" stroke={active ? "#fde68a" : "#c4943c"} strokeWidth="0.6"
        opacity={active ? "0.5" : "0.25"}
        strokeDasharray="11.8 11.8" />
    </svg>
  )
}

function PlanetIcon({ planet, active }: { planet: 'sun' | 'earth' | 'saturn'; active: boolean }) {
  switch (planet) {
    case 'sun': return <SunIcon active={active} />
    case 'earth': return <EarthIcon active={active} />
    case 'saturn': return <SaturnIcon active={active} />
  }
}

function StarshipIcon() {
  return (
    <svg width="30" height="84" viewBox="0 0 20 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a8a9a" />
          <stop offset="30%" stopColor="#d4d4e0" />
          <stop offset="50%" stopColor="#eeeef4" />
          <stop offset="70%" stopColor="#d4d4e0" />
          <stop offset="100%" stopColor="#8a8a9a" />
        </linearGradient>
        <linearGradient id="noseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9a9aaa" />
          <stop offset="40%" stopColor="#e8e8f0" />
          <stop offset="60%" stopColor="#e8e8f0" />
          <stop offset="100%" stopColor="#9a9aaa" />
        </linearGradient>
        <linearGradient id="boosterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#707080" />
          <stop offset="30%" stopColor="#b0b0c0" />
          <stop offset="50%" stopColor="#c8c8d4" />
          <stop offset="70%" stopColor="#b0b0c0" />
          <stop offset="100%" stopColor="#707080" />
        </linearGradient>
      </defs>
      {/* Super Heavy booster */}
      <rect x="6" y="28" width="8" height="22" rx="0.5" fill="url(#boosterGrad)" />
      {/* Booster grid lines */}
      <line x1="6" y1="32" x2="14" y2="32" stroke="#60607040" strokeWidth="0.3" />
      <line x1="6" y1="36" x2="14" y2="36" stroke="#60607040" strokeWidth="0.3" />
      <line x1="6" y1="40" x2="14" y2="40" stroke="#60607040" strokeWidth="0.3" />
      <line x1="6" y1="44" x2="14" y2="44" stroke="#60607040" strokeWidth="0.3" />
      {/* Grid fins */}
      <rect x="3" y="30" width="3" height="4" rx="0.5" fill="#505060" />
      <rect x="14" y="30" width="3" height="4" rx="0.5" fill="#505060" />
      {/* Grid fin detail lines */}
      <line x1="3.5" y1="31" x2="5.5" y2="31" stroke="#40404a" strokeWidth="0.3" />
      <line x1="3.5" y1="32" x2="5.5" y2="32" stroke="#40404a" strokeWidth="0.3" />
      <line x1="3.5" y1="33" x2="5.5" y2="33" stroke="#40404a" strokeWidth="0.3" />
      <line x1="14.5" y1="31" x2="16.5" y2="31" stroke="#40404a" strokeWidth="0.3" />
      <line x1="14.5" y1="32" x2="16.5" y2="32" stroke="#40404a" strokeWidth="0.3" />
      <line x1="14.5" y1="33" x2="16.5" y2="33" stroke="#40404a" strokeWidth="0.3" />
      {/* Hot-staging ring / interstage */}
      <rect x="5.5" y="26" width="9" height="3" rx="0.5" fill="#404050" />
      <line x1="5.5" y1="27.5" x2="14.5" y2="27.5" stroke="#606070" strokeWidth="0.3" />
      {/* Starship upper stage body */}
      <rect x="6" y="10" width="8" height="16" rx="0.5" fill="url(#bodyGrad)" />
      {/* Body panel lines */}
      <line x1="6" y1="14" x2="14" y2="14" stroke="#b0b0c040" strokeWidth="0.3" />
      <line x1="6" y1="18" x2="14" y2="18" stroke="#b0b0c040" strokeWidth="0.3" />
      <line x1="6" y1="22" x2="14" y2="22" stroke="#b0b0c040" strokeWidth="0.3" />
      {/* Forward flaps */}
      <path d="M6 12L4 10L4 16L6 16Z" fill="#a0a0b0" stroke="#80808a" strokeWidth="0.2" />
      <path d="M14 12L16 10L16 16L14 16Z" fill="#a0a0b0" stroke="#80808a" strokeWidth="0.2" />
      {/* Nose cone */}
      <path d="M10 0 Q6.5 6 6 10 L14 10 Q13.5 6 10 0Z" fill="url(#noseGrad)" />
      {/* Nose cone highlight */}
      <path d="M10 1 Q8 5 7.5 10 L9 10 Q9 5 10 1Z" fill="white" opacity="0.15" />
      {/* Heat shield tiles hint (dark side) */}
      <rect x="6" y="10" width="2.5" height="16" fill="#606068" opacity="0.3" rx="0.3" />
      {/* Engine nozzles */}
      <circle cx="8.5" cy="50" r="1" fill="#303038" stroke="#50505a" strokeWidth="0.3" />
      <circle cx="11.5" cy="50" r="1" fill="#303038" stroke="#50505a" strokeWidth="0.3" />
      <circle cx="10" cy="49" r="1" fill="#303038" stroke="#50505a" strokeWidth="0.3" />
    </svg>
  )
}

function FlameParticle({ delay, spread }: { delay: number; spread: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: [1, 0.6, 0],
        y: [0, 20, 40],
        scale: [1, 0.5, 0.1],
        x: [0, spread * 0.5, spread * 1.5],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
      style={{
        width: 3,
        height: 3,
        left: `calc(50% + ${spread}px)`,
        background: 'radial-gradient(circle, #fbbf24, #f97316)',
        boxShadow: '0 0 4px #f97316',
      }}
    />
  )
}

function NavRail({ activeId, scrollProgress, onNavigate }: { activeId: string; scrollProgress: number; onNavigate: (id: string) => void }) {
  const totalTravel = PLANET_OFFSETS[PLANET_OFFSETS.length - 1]
  const rocketOffset = scrollProgress * totalTravel
  const firstOffset = PLANET_OFFSETS[0]

  return (
    <div className="w-8 bg-white/[0.03] flex-shrink-0 relative flex flex-col items-center">
      {/* Track line - orbit path */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.06]" />

      {/* Rocket positioned continuously along track */}
      <div
        className="absolute z-20 flex flex-col items-center"
        style={{ top: `calc(30% - 42px + ${rocketOffset}px)` }}
      >
        <StarshipIcon />
        {/* Flame trail */}
        <div className="relative w-8 h-16 -mt-1">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0"
            animate={{ height: ['28px', '40px', '24px'], opacity: [0.25, 0.4, 0.2] }}
            transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 18, background: 'linear-gradient(to bottom, rgba(96,165,250,0.3), rgba(59,130,246,0.15), transparent)', borderRadius: '30% 30% 50% 50%', filter: 'blur(4px)' }}
          />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0"
            animate={{ height: ['22px', '34px', '18px'], opacity: [0.95, 1, 0.9] }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 8, background: 'linear-gradient(to bottom, #ffffff, #bfdbfe, #60a5fa, #3b82f6, #f97316, transparent)', borderRadius: '30% 30% 50% 50%', filter: 'blur(1px)' }}
          />
          {[4, 10, 17, 25].map((top, i) => (
            <motion.div key={i} className="absolute left-1/2 -translate-x-1/2"
              animate={{ opacity: [0.7, 1, 0.6], scaleX: [0.8, 1.1, 0.8] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
              style={{ top, width: 10 - i * 1.5, height: 2, background: `radial-gradient(ellipse, rgba(191,219,254,${0.9 - i * 0.15}), rgba(96,165,250,${0.6 - i * 0.1}), transparent)`, borderRadius: '50%', filter: 'blur(0.5px)' }}
            />
          ))}
          <motion.div className="absolute left-1/2 -translate-x-1/2 top-0"
            animate={{ height: ['8px', '14px', '6px'], opacity: [0.9, 1, 0.85] }}
            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 4, background: 'linear-gradient(to bottom, #ffffff, #e0f2fe, rgba(147,197,253,0.5), transparent)', borderRadius: '30% 30% 50% 50%', filter: 'blur(0.5px)' }}
          />
          <FlameParticle delay={0} spread={-3} />
          <FlameParticle delay={0.15} spread={2} />
          <FlameParticle delay={0.3} spread={-1} />
          <FlameParticle delay={0.5} spread={3} />
          <FlameParticle delay={0.7} spread={0} />
        </div>
      </div>

      {/* Planet waypoints */}
      {NAV_ITEMS.map((item, i) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="absolute z-10 group flex items-center"
            style={{ top: `calc(30% + ${PLANET_OFFSETS[i]}px)` }}
            title={item.label}
          >
            <motion.div
              animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={isActive ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
              className="transition-opacity duration-300"
              style={{ opacity: isActive ? 1 : 0.4 }}
            >
              <PlanetIcon planet={item.planet} active={isActive} />
            </motion.div>
            <span
              className={`absolute left-8 text-[10px] whitespace-nowrap pointer-events-none transition-all duration-200 ${
                isActive
                  ? 'opacity-100 text-[#c084fc]'
                  : 'opacity-0 group-hover:opacity-100 text-white/50'
              }`}
            >
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('demos')
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const sections = NAV_ITEMS.map(item => ({
      id: item.id,
      el: container.querySelector(`#section-${item.id}`) as HTMLElement | null,
    }))
    const scrollTop = container.scrollTop + 120

    // Determine active section
    let current = sections[0]?.id || 'demos'
    for (const s of sections) {
      if (s.el && s.el.offsetTop <= scrollTop) current = s.id
    }
    setActiveSection(current)

    // Calculate continuous progress (0 to 1) for smooth rocket movement
    const sectionTops = sections.map(s => s.el?.offsetTop ?? 0)
    const firstTop = sectionTops[0] ?? 0
    const lastTop = sectionTops[sectionTops.length - 1] ?? 1
    const range = lastTop - firstTop
    if (range > 0) {
      const progress = Math.max(0, Math.min(1, (container.scrollTop - firstTop) / range))
      setScrollProgress(progress)
    }
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavigate = (id: string) => {
    const container = scrollRef.current
    if (!container) return
    const target = container.querySelector(`#section-${id}`) as HTMLElement | null
    if (target) {
      container.scrollTo({ top: target.offsetTop - 32, behavior: 'smooth' })
    }
  }

  return (
    <div className="h-screen w-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background layers */}
      <MatrixRain
        className="absolute inset-0 w-full h-full"
        color="#c084fc"
        opacity={0.12}
        fontSize={14}
        speed={0.4}
      />
      <CyberGrid className="absolute inset-0 pointer-events-none" />

      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.04) 0%, transparent 70%)',
        }}
      />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#c084fc"
      />

      <div className="flex h-full relative z-10">
        {/* Left 2/3 - Demos + Publications */}
        <div ref={scrollRef} className="w-2/3 py-8 px-8 md:px-12 relative z-10 overflow-y-auto hide-scrollbar">
          {/* Selected Demos */}
          <h2 id="section-demos" className="text-xs font-medium uppercase tracking-widest text-[#c084fc]/40 mb-6">
            Selected Demos
          </h2>
          <DemoGallery />

          {/* Divider */}
          <div className="w-full h-px bg-white/5 my-10" />

          {/* Highlights */}
          <h2 id="section-highlights" className="text-xs font-medium uppercase tracking-widest text-[#c084fc]/40 mb-6">
            Highlights
          </h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            <a
              href="http://eaircon.zhidx.com/2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-80 rounded-lg overflow-hidden border border-white/5 hover:border-[#c084fc]/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/images/eaircon_talk.jpg"
                  alt="EAIRCon 2025 Talk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-white/80 group-hover:text-[#c084fc] transition-colors">
                  2025 EAIRCon - Invited Talk
                </p>
                <p className="text-[10px] text-neutral-500 mt-1">
                  2025 中国具身智能机器人大会
                </p>
              </div>
            </a>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/5 my-10" />

          {/* All Publications */}
          <h2 id="section-publications" className="text-xs font-medium uppercase tracking-widest text-[#c084fc]/40 mb-6">
            All Publications
          </h2>
          <PublicationList />
        </div>

        {/* Navigation Rail */}
        <NavRail activeId={activeSection} scrollProgress={scrollProgress} onNavigate={handleNavigate} />

        {/* Right 1/3 - Profile + Robot */}
        <div className="w-1/3 relative flex flex-col min-w-0">
          {/* Profile section */}
          <div className="flex-shrink-0 px-6 pt-8 pb-4 relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-[#c084fc] to-[#9333ea]">
              Junjie Wen / 文俊杰
            </h1>
            <p className="mt-3 text-xs text-neutral-400 leading-relaxed">
              Hello, I am Junjie Wen, you can also call me Jayce. I received my Master degree in East China Normal University(ECNU) advised by Chaomin Shen. Besides, I received my Bachelor degree in Software Engineering at Southwest Jiao Tong University(SWJTU).
            </p>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              If you are interested in robotics or my work, please directly contact with me.
            </p>
            <p className="mt-2 text-xs font-medium text-[#c084fc]">
              Research: Humanoid Learning
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <a href="https://github.com/lesjie-wen" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[#c084fc] transition-colors">
                <Github size={16} />GitHub
              </a>
              <a href="https://scholar.google.com/citations?user=xphZoxIAAAAJ" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[#c084fc] transition-colors">
                <GraduationCap size={16} />Scholar
              </a>
              <a href="https://x.com/lesjie298776" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[#c084fc] transition-colors">
                <XIcon size={14} />X
              </a>
              <a href="mailto:tsunami1999@163.com"
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-[#c084fc] transition-colors">
                <Mail size={16} />Email
              </a>
            </div>
          </div>

          {/* 3D Robot */}
          <div className="flex-1 relative">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
