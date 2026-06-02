'use client'

import Link from 'next/link'
import { Hash, FunctionSquare, Percent, TrendingUp, Triangle, Dices, BarChart2 } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'

const topics = [
  { label: 'Number', href: '/dashboard/lessons/number', icon: Hash },
  { label: 'Algebra', href: '/dashboard/lessons/algebra', icon: FunctionSquare },
  { label: 'Ratio', href: '/dashboard/lessons/ratio', icon: Percent },
  { label: 'Graphs', href: '/dashboard/lessons/graphs', icon: TrendingUp },
  { label: 'Geometry', href: '/dashboard/lessons/geometry', icon: Triangle },
  { label: 'Probability', href: '/dashboard/lessons/probability', icon: Dices },
  { label: 'Statistics', href: '/dashboard/lessons/statistics', icon: BarChart2 },
]

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Lessons' },
          ]}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {topics.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 group-hover:bg-blue-200 transition-colors">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm font-semibold text-gray-900">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}