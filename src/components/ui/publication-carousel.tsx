'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  highlight?: boolean
  video?: string
  image?: string
  links?: { label: string; url: string }[]
}

// Videos and images served from /public

const publications: Publication[] = [
  {
    title: "dVLA: Diffusion Vision-Language-Action Model with Multimodal Chain-of-Thought",
    authors: "Junjie Wen*, Minjie Zhu*, Jiaming Liu, Zhiyuan Liu, Yicun Yang, Linfeng Zhang, Shanghang Zhang, Yichen Zhu, Yi Xu",
    venue: "Arxiv",
    year: "2025",
    highlight: true,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2509.25681" },
    ],
  },
  {
    title: "DexVLA: Vision-Language Model with Plug-In Diffusion Expert for General Robot Control",
    authors: "Junjie Wen*, Yichen Zhu*, Zhibin Tang, Jinming Li, Yaxin Peng, Chaomin Shen, Feifei Feng",
    venue: "Arxiv",
    year: "2025",
    highlight: true,
    video: "/videos/dexvla_demo.mp4",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2502.05855" },
      { label: "Code", url: "https://github.com/juruobenruo/DexVLA" },
    ],
  },
  {
    title: "TinyVLA: Towards Fast, Data-Efficient Vision-Language-Action Models for Robotic Manipulation",
    authors: "Junjie Wen*, Yichen Zhu*, Jinming Li, Minjie Zhu, Kun Wu, Zhiyuan Xu, Ran Cheng, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "RA-L 2025 / IROS 2025",
    year: "2025",
    highlight: true,
    video: "/videos/tinyvla.mp4`,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2409.12514" },
      { label: "Code", url: "https://github.com/lesjie-wen/tinyvla" },
    ],
  },
  {
    title: "PointVLA: Injecting the 3D World into Vision-Language-Action Models",
    authors: "Chengmeng Li, Junjie Wen, Yan Peng, Yaxin Peng, Feifei Feng, Yichen Zhu",
    venue: "Arxiv",
    year: "2025",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2503.07511" },
    ],
  },
  {
    title: "ChatVLA-2: Vision-Language-Action Model with Open-World Embodied Reasoning from Pretrained Knowledge",
    authors: "Zhongyi Zhou, Yichen Zhu, Junjie Wen, Chaomin Shen, Yi Xu",
    venue: "Arxiv",
    year: "2025",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2505.21906" },
    ],
  },
  {
    title: "ChatVLA: Unified Multimodal Understanding and Robot Control with Vision-Language-Action Model",
    authors: "Zhongyi Zhou, Yichen Zhu, Minjie Zhu, Junjie Wen, Ning Liu, Zhiyuan Xu, Weibin Meng, Ran Cheng, Yaxin Peng, Chaomin Shen, Feifei Feng",
    venue: "EMNLP",
    year: "2025",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2502.14420" },
    ],
  },
  {
    title: "WorldEval: World Model as Real-World Robot Policies Evaluator",
    authors: "Yaxuan Li, Yichen Zhu, Junjie Wen, Chaomin Shen, Yi Xu",
    venue: "Arxiv",
    year: "2025",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2505.19017" },
    ],
  },
  {
    title: "ObjectVLA: End-to-End Open-World Object Manipulation Without Demonstration",
    authors: "Minjie Zhu, Yichen Zhu, Jinming Li, Zhongyi Zhou, Junjie Wen, Xiaoyu Liu, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "Arxiv",
    year: "2025",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2502.19250" },
    ],
  },
  {
    title: "Scaling Diffusion Policy in Transformer to 1 Billion Parameters for Robotic Manipulation",
    authors: "Minjie Zhu*, Yichen Zhu*, Jinming Li, Junjie Wen, Zhiyuan Xu, Ning Liu, Ran Cheng, Chaomin Shen, Yaxin Peng, Feifei Feng",
    venue: "ICRA",
    year: "2025",
    video: "/videos/scaledp.mp4`,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2409.14411" },
    ],
  },
  {
    title: "Discrete Policy: Learning Disentangled Action Space for Multi-Task Robotic Manipulation",
    authors: "Kun Wu, Yichen Zhu, Jinming Li, Junjie Wen, Ning Liu, Zhiyuan Xu, Qinru Qiu, Jian Tang",
    venue: "ICRA",
    year: "2025",
    video: "/videos/discreteDP.mp4`,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2409.18707" },
    ],
  },
  {
    title: "Diffusion-VLA: Scaling Robot Foundation Models via Unified Diffusion and Autoregression",
    authors: "Junjie Wen*, Minjie Zhu*, Yichen Zhu*, Zhibin Tang, Jinming Li, Zhongyi Zhou, Chengmeng Li, Xiaoyu Liu, Yaxin Peng, Chaomin Shen",
    venue: "Arxiv",
    year: "2024",
    highlight: true,
    video: "/videos/divla.mp4`,
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2412.03293" },
    ],
  },
  {
    title: "Object-Centric Instruction Augmentation for Robotic Manipulation",
    authors: "Junjie Wen*, Yichen Zhu*, Minjie Zhu, Jinming Li, Zhiyuan Xu, Zhengping Che, Chaomin Shen, Yaxin Peng, Dong Liu, Feifei Feng, Jian Tang",
    venue: "ICRA",
    year: "2024",
    highlight: true,
    video: "/videos/oci.mp4`,
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/10609992" },
    ],
  },
  {
    title: "Language-Conditioned Robotic Manipulation with Fast and Slow Thinking",
    authors: "Minjie Zhu*, Yichen Zhu*, Jinming Li, Junjie Wen, Zhiyuan Xu, Zhengping Che, Chaomin Shen, Yaxin Peng, Dong Liu, Feifei Feng, Jian Tang",
    venue: "ICRA",
    year: "2024",
    video: "/videos/rfst.mp4`,
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/10611525" },
    ],
  },
  {
    title: "A Survey on Robotics with Foundation Models: toward Embodied AI",
    authors: "Zhiyuan Xu*, Kun Wu*, Junjie Wen, Jinming Li, Ning Liu, Zhengping Che, Jian Tang",
    venue: "Arxiv",
    year: "2024",
    image: "/images/embodied_ai_survey.jpg",
    links: [
      { label: "Paper", url: "https://arxiv.org/abs/2402.02385" },
    ],
  },
]

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-contain rounded-lg"
    />
  )
}

export function PublicationCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % publications.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  const pub = publications[current]
  const hasMedia = pub.video || pub.image

  return (
    <div
      className="relative w-full h-full flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {publications.map((p, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current
                ? 'bg-white w-6'
                : p.highlight
                  ? 'bg-blue-400/40 w-3 hover:bg-blue-400/60'
                  : 'bg-white/15 w-3 hover:bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Publication content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Video / Image preview */}
            {hasMedia && (
              <div className="w-full aspect-[4/3] max-h-[45vh] mb-3 rounded-lg overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                {pub.video ? (
                  <VideoPlayer src={pub.video} />
                ) : pub.image ? (
                  <img
                    src={pub.image}
                    alt={pub.title}
                    className="w-full h-full object-contain"
                  />
                ) : null}
              </div>
            )}

            {/* Meta tags */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-medium bg-white/10 text-white/80 rounded-full border border-white/10">
                {pub.venue}
              </span>
              <span className="text-xs text-white/40">{pub.year}</span>
              {pub.highlight && (
                <span className="px-2 py-0.5 text-xs text-blue-300/80 bg-blue-500/10 rounded-full border border-blue-500/20">
                  1st Author
                </span>
              )}
              {pub.video && (
                <span className="px-2 py-0.5 text-xs text-green-300/80 bg-green-500/10 rounded-full border border-green-500/20">
                  Demo
                </span>
              )}
              <span className="text-xs text-white/25 ml-auto">
                {current + 1} / {publications.length}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base md:text-lg font-semibold text-white/95 leading-tight mb-2">
              {pub.title}
            </h2>

            {/* Authors */}
            <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-1">
              {pub.authors}
            </p>

            {/* Links */}
            {pub.links && (
              <div className="flex gap-2">
                {pub.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
