"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/lib/hooks/useUser";
import { createClient } from "@/app/lib/supabase";

export default function Navbar() {
  const { firstName, loading, subscriptionTier, refreshUser } = useUser();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    await refreshUser();
    router.push("/");
    setSigningOut(false);
  };

  return (
    <nav
      className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 sticky top-0 z-50"
      style={{ boxShadow: "0 1px 0 rgba(15,28,56,0.06)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-slate-900 text-[10px] font-black tracking-wide"
            style={{ color: "#93c5fd", fontFamily: "'Sora', sans-serif" }}
          >
            MWM
          </div>
          <div className="flex flex-col leading-none gap-px">
            <span className="text-[9px] font-semibold tracking-[0.2em] text-blue-400 uppercase">Maths with</span>
            <span
              className="text-[17px] font-black text-slate-900 tracking-tight leading-none"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Madison
            </span>
          </div>
        </Link>

        {/* Nav links — only shown pre-login */}
        {!loading && !firstName && (
          <ul className="flex items-center gap-1">
            <li>
              <Link
                href="/meet-madison"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                Meet Madison
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
              >
                Pricing
              </Link>
            </li>
          </ul>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">

          {/* PRE-LOGIN: Log in + Get started */}
          {!loading && !firstName && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </Link>
              <div className="h-5 w-px bg-slate-200" />
              <Link
                href="/signup"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Get started
              </Link>
            </>
          )}

          {/* POST-LOGIN: greeting + user icon dropdown */}
          {!loading && firstName && (
            <div className="relative group flex items-center gap-2">
              <span className="text-sm font-medium text-slate-700">Hi, {firstName}</span>
              <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </button>
              <div className="absolute right-0 top-full pt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div
                  className="rounded-xl border border-slate-100 bg-white overflow-hidden"
                  style={{ boxShadow: "0 8px 24px rgba(15,28,56,0.12)" }}
                >
                  <div className="flex flex-col p-1">
                    <Link href="/dashboard" className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-500 transition-colors">
                      Dashboard
                    </Link>
                    <Link href="/account" className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-500 transition-colors">
                      My account
                    </Link>
                    <button
                      onClick={handleSignOut}
                      disabled={signingOut}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 text-left transition-colors w-full disabled:opacity-50"
                    >
                      {signingOut ? "Signing out..." : "Sign out"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POST-LOGIN free tier: upgrade button */}
          {!loading && firstName && subscriptionTier === "free" && (
            <>
              <div className="h-5 w-px bg-slate-200" />
              <Link
                href="/upgrade"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Upgrade your plan
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}