import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junjie Wen | jaycewen.github.io",
  description: "Junjie Wen (文俊杰) - Robotics Researcher specializing in Vision-Language-Action Models, Robotic Manipulation, and Embodied AI.",
  keywords: ["Junjie Wen", "文俊杰", "robotics", "VLA", "embodied AI", "DexVLA", "TinyVLA"],
  openGraph: {
    title: "Junjie Wen | jaycewen.github.io",
    description: "Robotics Researcher specializing in Vision-Language-Action Models, Robotic Manipulation, and Embodied AI.",
    url: "https://jaycewen.github.io",
    siteName: "Junjie Wen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
