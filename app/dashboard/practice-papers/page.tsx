import Breadcrumb from '../components/Breadcrumb'

export default function PracticePapersPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Practice Papers' },
          ]}
        />
        <h1 className="text-3xl font-bold text-gray-900">Practice Papers — coming soon</h1>
      </div>
    </div>
  )
}