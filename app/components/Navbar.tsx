"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/app/lib/hooks/useUser";
import { createClient } from "@/app/lib/supabase";

export default function Navbar() {
  const { firstName, loading, subscriptionTier, refreshUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);
  const [signingOut, setSigningOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    await refreshUser();
    router.push("/");
    setSigningOut(false);
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full px-6 fixed top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-slate-100" : "bg-transparent border-transparent"
      }`}
      style={scrolled ? { boxShadow: "0 1px 0 rgba(15,28,56,0.06)" } : {}}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-none gap-px">
            <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? "text-blue-400" : "text-blue-200"}`}>Maths with</span>
            <span
              className={`text-[22px] font-black tracking-tight leading-none transition-colors duration-300 ${scrolled ? "text-slate-900" : "text-white"}`}
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
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${scrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white hover:text-white hover:bg-white/10"}`}
              >
                Meet Madison
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className={`px-4 py-2 rounded-lg text-base font-medium transition-all ${scrolled ? "text-slate-600 hover:text-slate-900 hover:bg-slate-50" : "text-white hover:text-white hover:bg-white/10"}`}
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
                className={`px-4 py-2 text-base font-medium transition-colors ${scrolled ? "text-slate-600 hover:text-slate-900" : "text-white hover:text-white"}`}
              >
                Log in
              </Link>
              <div className={`h-5 w-px ${scrolled ? "bg-slate-200" : "bg-white/20"}`} />
              <Link
                href="/signup"
                className={`rounded-lg px-3.5 py-1.75 text-base font-semibold transition-colors ${scrolled ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:bg-white/90"}`}
              >
                Get started
              </Link>
            </>
          )}

          {/* POST-LOGIN: greeting + user icon dropdown */}
          {!loading && firstName && (
            <div className="relative flex items-center gap-2" ref={dropdownRef}>
              <span className={`text-sm font-medium transition-colors duration-300 ${scrolled ? "text-slate-700" : "text-white"}`}>Hi, {firstName}</span>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  color: scrolled ? (dropdownOpen ? "#0f1c38" : "#475569") : "white",
                  background: dropdownOpen ? (scrolled ? "#f1f5f9" : "rgba(255,255,255,0.15)") : "transparent",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 z-50 animate-fadeIn">
                  <div
                    className="rounded-xl border border-slate-100 bg-white overflow-hidden"
                    style={{ boxShadow: "0 8px 24px rgba(15,28,56,0.12)" }}
                  >
                    <div className="flex flex-col p-1">
                      <Link
                        href="/dashboard"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-500 transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/account"
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-500 transition-colors"
                      >
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
              )}
            </div>
          )}

          {/* POST-LOGIN free tier: upgrade button */}
          {!loading && firstName && subscriptionTier === "free" && (
            <>
              <div className={`h-5 w-px ${scrolled ? "bg-slate-200" : "bg-white/20"}`} />
              <Link
                href="/upgrade"
                className={`rounded-lg px-3.5 py-1.75 text-base font-semibold transition-colors ${scrolled ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-900 hover:bg-white/90"}`}
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