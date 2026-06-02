'use client'

import Link from 'next/link'
import { Video, BookOpen, Layers, FileText } from 'lucide-react'
import Breadcrumb from './components/Breadcrumb'

const cards = [
  {
    label: 'Lessons',
    href: '/dashboard/lessons',
    icon: Video,
  },
  {
    label: 'Additional Exercises',
    href: '/dashboard/additional-exercises',
    icon: BookOpen,
  },
  {
    label: 'Flashcards',
    href: '/dashboard/flashcards',
    icon: Layers,
  },
  {
    label: 'Practice Papers',
    href: '/dashboard/practice-papers',
    icon: FileText,
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb items={[{ label: 'Dashboard' }]} />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {cards.map(({ label, href, icon: Icon }) => (
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