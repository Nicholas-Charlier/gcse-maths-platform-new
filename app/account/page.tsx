'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { useUser } from '../lib/hooks/useUser'
import { createBrowserClient } from '@supabase/ssr'

export default function AccountPage() {
  const { firstName, loading } = useUser()
  const [fullName, setFullName] = useState<{ first: string; last: string } | null>(null)
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [loaded, setLoaded] = useState(false)

  if (!loaded && !loading) {
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user
      supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user?.id)
        .single()
        .then(({ data: profile }) => {
          setForm({
            firstName: profile?.first_name ?? '',
            lastName: profile?.last_name ?? '',
            email: user?.email ?? '',
          })
          setFullName({
            first: profile?.first_name ?? '',
            last: profile?.last_name ?? '',
          })
        })
    })
    setLoaded(true)
  }

  const initials = fullName
    ? `${fullName.first[0] ?? ''}${fullName.last[0] ?? ''}`.toUpperCase()
    : '??'

  const handleSave = async () => {
    setSaveLoading(true)
    setSaveSuccess(false)
    const { data: { user } } = await supabase.auth.getUser()
    await supabase
      .from('profiles')
      .update({ first_name: form.firstName, last_name: form.lastName })
      .eq('id', user?.id)
    setFullName({ first: form.firstName, last: form.lastName })
    setSaveLoading(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleResetPassword = async () => {
    setResetLoading(true)
    setResetError('')
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.auth.resetPasswordForEmail(user?.email ?? '', {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) {
      setResetError(error.message)
    } else {
      setResetSent(true)
    }
    setResetLoading(false)
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-50 p-8 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h1>
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
          <Settings className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-semibold text-gray-900">Profile Settings</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-12 max-w-2xl">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{form.firstName} {form.lastName}</p>
            <p className="text-sm text-gray-500">Student</p>
          </div>
        </div>

        {/* Personal info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">First Name</label>
            <input
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500">Last Name</label>
            <input
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-6">
          <label className="text-sm text-gray-500">Email</label>
          <input
            value={form.email}
            disabled
            className="border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saveLoading}
          className="bg-gray-900 text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saveLoading ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save'}
        </button>

        {/* Divider */}
        <div className="border-t border-gray-100 my-10" />

        {/* Reset password */}
        <h2 className="text-lg font-bold text-gray-900 mb-1">Reset password</h2>
        <p className="text-sm text-gray-500 mb-4">
          We'll send a reset link to your email address.
        </p>

        {resetSent ? (
          <p className="text-sm text-blue-400 font-medium">Reset email sent — check your inbox.</p>
        ) : (
          <button
            onClick={handleResetPassword}
            disabled={resetLoading}
            className="bg-blue-300 hover:bg-blue-400 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
          >
            {resetLoading ? 'Sending...' : 'Reset Password'}
          </button>
        )}
        {resetError && <p className="text-sm text-red-400 mt-2">{resetError}</p>}
      </div>
    </div>
  )
}