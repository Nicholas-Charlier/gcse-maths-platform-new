import Link from 'next/link'
import { Hash, FunctionSquare, Percent, TrendingUp, Triangle, Dices, BarChart2 } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'

const topics = [
  { label: 'Number', href: '/dashboard/lessons/number', icon: Hash, color: "#3b82f6", bg: "#dbeafe" },
  { label: 'Algebra', href: '/dashboard/lessons/algebra', icon: FunctionSquare, color: "#16a34a", bg: "#dcfce7" },
  { label: 'Ratio', href: '/dashboard/lessons/ratio', icon: Percent, color: "#f59e0b", bg: "#fef3c7" },
  { label: 'Graphs', href: '/dashboard/lessons/graphs', icon: TrendingUp, color: "#ef4444", bg: "#fee2e2" },
  { label: 'Geometry', href: '/dashboard/lessons/geometry', icon: Triangle, color: "#7c3aed", bg: "#ede9fe" },
  { label: 'Probability', href: '/dashboard/lessons/probability', icon: Dices, color: "#0891b2", bg: "#cffafe" },
  { label: 'Statistics', href: '/dashboard/lessons/statistics', icon: BarChart2, color: "#be185d", bg: "#fce7f3" },
]

export default function LessonsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#f5f7fb" }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Lessons' },
          ]}
        />

        <h1
          className="text-3xl font-black text-slate-900 mb-10"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}
        >
          Pick a topic.
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {topics.map(({ label, href, icon: Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-2xl p-6 transition-all duration-200 bg-white border border-slate-200 hover:border-blue-200 hover:bg-blue-50"
              style={{ boxShadow: "0 2px 12px rgba(15,28,56,0.05)" }}
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
          ))}
        </div>
      </div>
    </div>
  )
}