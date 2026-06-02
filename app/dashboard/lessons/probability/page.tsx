import Breadcrumb from '../../components/Breadcrumb'

export default function ProbabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Lessons', href: '/dashboard/lessons' },
            { label: 'Probability' },
          ]}
        />
        <h1 className="text-3xl font-bold text-gray-900">Probability — coming soon</h1>
      </div>
    </div>
  )
}