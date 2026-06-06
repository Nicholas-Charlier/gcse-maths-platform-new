"use client";

import Link from 'next/link'
import { useState } from 'react'
import { Hash, FunctionSquare, Percent, TrendingUp, Triangle, Dices, BarChart2 } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'

const topics = [
  { label: 'Number', href: '/dashboard/lessons/number', icon: Hash, color: "#3b82f6", bg: "#dbeafe", hoverBg: "#eff6ff", hoverBorder: "#93c5fd" },
  { label: 'Algebra', href: '/dashboard/lessons/algebra', icon: FunctionSquare, color: "#16a34a", bg: "#dcfce7", hoverBg: "#f0fdf4", hoverBorder: "#86efac" },
  { label: 'Ratio', href: '/dashboard/lessons/ratio', icon: Percent, color: "#f59e0b", bg: "#fef3c7", hoverBg: "#fffbeb", hoverBorder: "#fcd34d" },
  { label: 'Graphs', href: '/dashboard/lessons/graphs', icon: TrendingUp, color: "#ef4444", bg: "#fee2e2", hoverBg: "#fef2f2", hoverBorder: "#fca5a5" },
  { label: 'Geometry', href: '/dashboard/lessons/geometry', icon: Triangle, color: "#7c3aed", bg: "#ede9fe", hoverBg: "#f5f3ff", hoverBorder: "#c4b5fd" },
  { label: 'Probability', href: '/dashboard/lessons/probability', icon: Dices, color: "#0891b2", bg: "#cffafe", hoverBg: "#ecfeff", hoverBorder: "#67e8f9" },
  { label: 'Statistics', href: '/dashboard/lessons/statistics', icon: BarChart2, color: "#be185d", bg: "#fce7f3", hoverBg: "#fdf2f8", hoverBorder: "#f9a8d4" },
]

export default function LessonsPage() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Lessons' },
          ]}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topics.map(({ label, href, icon: Icon, color, bg, hoverBg, hoverBorder }) => {
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
                  className="text-sm font-bold text-slate-900 leading-tight"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}