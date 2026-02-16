'use client'

import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout"

const demoFrames = [
  {
    id: 1,
    video: "/videos/dexvla_demo.mp4",
    title: "DexVLA",
    url: "https://dex-vla.github.io/",
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  },
  {
    id: 2,
    video: "/videos/gallary_1.mp4",
    title: "HumanoidExo",
    url: "https://humanoid-exo.github.io/",
    defaultPos: { x: 4, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  },
  {
    id: 3,
    video: "/videos/gallary_chatvla2.mp4",
    title: "ChatVLA-2",
    url: "https://chatvla-2.github.io/",
    defaultPos: { x: 8, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  },
  {
    id: 4,
    video: "/videos/active_umi.mp4",
    title: "ActiveUMI",
    url: "https://activeumi.github.io/",
    defaultPos: { x: 0, y: 4, w: 4, h: 4 },
    mediaSize: 1,
  },
  {
    id: 5,
    video: "/videos/humanoid.mp4",
    title: "HumanoidExo",
    url: "https://humanoid-exo.github.io/",
    defaultPos: { x: 4, y: 4, w: 4, h: 4 },
    mediaSize: 1,
  },
  {
    id: 6,
    video: "/videos/gallary2.mp4",
    title: "TinyVLA",
    url: "https://tiny-vla.github.io/",
    defaultPos: { x: 8, y: 4, w: 4, h: 4 },
    mediaSize: 1,
  },
]

export function DemoGallery() {
  return (
    <div className="w-full aspect-[3/2] rounded-lg overflow-hidden">
      <DynamicFrameLayout
        frames={demoFrames}
        className="w-full h-full"
        hoverSize={6}
        gapSize={3}
        autoPlay
      />
    </div>
  )
}
