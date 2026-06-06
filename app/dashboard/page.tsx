"use client";

import Link from 'next/link'
import { useState } from 'react'
import { Video, BookOpen, Layers, FileText } from 'lucide-react'
import Breadcrumb from './components/Breadcrumb'

const cards = [
  {
    label: 'Lessons',
    href: '/dashboard/lessons',
    icon: Video,
    color: "#3b82f6",
    bg: "#dbeafe",
    hoverBg: "#eff6ff",
    hoverBorder: "#93c5fd",
    description: "Video lessons by topic",
  },
  {
    label: 'Additional Exercises',
    href: '/dashboard/additional-exercises',
    icon: BookOpen,
    color: "#16a34a",
    bg: "#dcfce7",
    hoverBg: "#f0fdf4",
    hoverBorder: "#86efac",
    description: "Graded practice questions",
  },
  {
    label: 'Flashcards',
    href: '/dashboard/flashcards',
    icon: Layers,
    color: "#7c3aed",
    bg: "#ede9fe",
    hoverBg: "#f5f3ff",
    hoverBorder: "#c4b5fd",
    description: "Key formulas & definitions",
  },
  {
    label: 'Practice Papers',
    href: '/dashboard/practice-papers',
    icon: FileText,
    color: "#ef4444",
    bg: "#fee2e2",
    hoverBg: "#fef2f2",
    hoverBorder: "#fca5a5",
    description: "Full papers with mark schemes",
  },
]

export default function DashboardPage() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(({ label, href, icon: Icon, color, bg, hoverBg, hoverBorder, description }) => {
            const isHovered = hovered === href
            return (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col rounded-2xl p-6 transition-all duration-200"
                style={{
                  background: isHovered ? hoverBg : "#fff",
                  border: `1px solid ${isHovered ? hoverBorder : "#e2e8f0"}`,
                  boxShadow: isHovered
                    ? `0 4px 20px ${color}20`
                    : "0 2px 12px rgba(15,28,56,0.05)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: bg }}
                >
                  <Icon style={{ color }} className="w-5 h-5" />
                </div>
                <span
                  className="text-sm font-bold text-slate-900 mb-1 leading-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {label}
                </span>
                <span className="text-xs text-slate-400 font-medium leading-snug">
                  {description}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}