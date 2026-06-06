'use client'

import { useState, useEffect, useMemo } from 'react'
import { Settings } from 'lucide-react'
import { createClient } from '@/app/lib/supabase'
import { useUser } from '@/app/lib/hooks/useUser'

export default function AccountPage() {
  const { refreshUser } = useUser()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [userId, setUserId] = useState<string | null>(null)
  const [initials, setInitials] = useState('??')
  const [resetSent, setResetSent] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [resetError, setResetError] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', user.id)
        .single()
      const first = profile?.first_name ?? ''
      const last = profile?.last_name ?? ''
      setUserId(user.id)
      setForm({ firstName: first, lastName: last, email: user.email ?? '' })
      setInitials(`${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase())
      setLoading(false)
    }
    load()
  }, [supabase])

  const handleSave = async () => {
    if (!userId) return
    const trimmedFirst = form.firstName.trim()
    const trimmedLast = form.lastName.trim()
    if (!trimmedFirst || !trimmedLast) {
      setSaveError('First and last name cannot be empty.')
      return
    }
    setSaveLoading(true)
    setSaveSuccess(false)
    setSaveError('')
    const { error } = await supabase
      .from('profiles')
      .update({ first_name: trimmedFirst, last_name: trimmedLast })
      .eq('id', userId)
    if (error) {
      setSaveError('Failed to save changes. Please try again.')
      setSaveLoading(false)
      return
    }
    setInitials(`${trimmedFirst[0] ?? ''}${trimmedLast[0] ?? ''}`.toUpperCase())
    setSaveLoading(false)
    setSaveSuccess(true)
    await refreshUser()
  }

  const handleResetPassword = async () => {
    if (!form.email) return
    setResetLoading(true)
    setResetError('')
    const { error } = await supabase.auth.resetPasswordForEmail(form.email, {
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

  const inputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"

  return (
    <div className="min-h-screen flex" style={{ background: "#f5f7fb" }}>

      {/* Sidebar */}
      <div
        className="w-64 flex-shrink-0 flex flex-col px-6 py-10 border-r border-slate-100"
        style={{ background: "#fff" }}
      >
        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-2">Account</p>
        <h1
          className="text-xl font-black text-slate-900 mb-8"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}
        >
          Settings
        </h1>
        <nav className="flex flex-col gap-1">
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: "#f1f5f9" }}
          >
            <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Settings className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-slate-900">Profile Settings</span>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 px-12 py-10 max-w-2xl">

        {/* Avatar + name header */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#0f1c38" }}
          >
            <span
              className="text-white font-bold text-lg"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              {initials}
            </span>
          </div>
          <div>
            <p
              className="font-black text-slate-900 text-lg leading-tight"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.015em" }}
            >
              {form.firstName} {form.lastName}
            </p>
            <p className="text-sm text-slate-400 mt-0.5">{form.email}</p>
          </div>
        </div>

        {/* Profile card */}
        <div
          className="bg-white rounded-2xl p-8 mb-5"
          style={{ border: "1px solid #e8ecf2", boxShadow: "0 2px 12px rgba(15,28,56,0.05)" }}
        >
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-1">Profile</p>
          <h2
            className="text-base font-black text-slate-900 mb-6"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Personal information
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">First name</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">Last name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              value={form.email}
              disabled
              className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-400 cursor-not-allowed"
            />
          </div>

          {saveError && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M8 5v3M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-red-600">{saveError}</p>
            </div>
          )}

          {saveSuccess && (
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#16a34a" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm text-green-700 font-medium">Changes saved successfully.</p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saveLoading}
            className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-50"
            style={{
              background: "#0f1c38",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 4px 12px rgba(15,28,56,0.15)",
            }}
          >
            {saveLoading ? 'Saving...' : 'Save changes'}
          </button>
        </div>

        {/* Password card */}
        <div
          className="bg-white rounded-2xl p-8"
          style={{ border: "1px solid #e8ecf2", boxShadow: "0 2px 12px rgba(15,28,56,0.05)" }}
        >
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-1">Security</p>
          <h2
            className="text-base font-black text-slate-900 mb-1"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Reset password
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            We'll send a reset link to your email address.
          </p>

          {resetSent ? (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#3b82f6" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-sm text-blue-700 font-medium">Reset email sent — check your inbox.</p>
            </div>
          ) : (
            <>
              <button
                onClick={handleResetPassword}
                disabled={resetLoading}
                className="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-all disabled:opacity-50"
                style={{
                  background: "#0f1c38",
                  fontFamily: "'Sora', sans-serif",
                  boxShadow: "0 4px 12px rgba(15,28,56,0.15)",
                }}
              >
                {resetLoading ? 'Sending...' : 'Reset password'}
              </button>
              {resetError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mt-4">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                    <path d="M8 5v3M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-sm text-red-600">{resetError}</p>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}