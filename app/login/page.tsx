"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";
import { useUser } from "@/app/lib/hooks/useUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const { refreshUser } = useUser();

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next");
        const safePath = next?.startsWith("/") ? next : "/dashboard";
        window.location.href = safePath;
      } else {
        setChecking(false);
      }
    });
  }, [supabase]);

  if (checking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    await refreshUser();
    router.push("/dashboard");
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: "#f5f7fb" }}
    >
      

      {/* Card */}
      <div
        className="w-full max-w-md bg-white rounded-2xl px-10 py-10"
        style={{ boxShadow: "0 4px 32px rgba(15,28,56,0.08), 0 1px 4px rgba(15,28,56,0.04)", border: "1px solid #e8ecf2" }}
      >
        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-2">Welcome back</p>
        <h1
          className="text-2xl font-black text-slate-900 mb-1"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}
        >
          Log in to your account
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
            Sign up free
          </Link>
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="jane@example.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-500 font-medium hover:text-blue-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
            />
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M8 5v3M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl py-3.5 text-white font-bold text-sm transition-all disabled:opacity-60"
            style={{
              background: "#0f1c38",
              fontFamily: "'Sora', sans-serif",
              boxShadow: "0 4px 16px rgba(15,28,56,0.18)",
            }}
          >
            {loading ? "Logging in..." : "Log in →"}
          </button>
        </form>
      </div>


    </main>
  );
}