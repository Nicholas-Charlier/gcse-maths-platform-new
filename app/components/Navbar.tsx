// app/components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-100 bg-white px-6 py-0 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-medium text-xs tracking-wide">
            MWM
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-indigo-600 uppercase">
              Maths with
            </span>
            <span className="text-[18px] font-black text-gray-900 tracking-tight leading-none">
              Madison
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-1">
          {[
            { label: "Meet Madison", href: "/meet-madison" },
            { label: "Pricing", href: "/pricing" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-indigo-600 transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User icon with dropdown */}
        <div className="relative group flex items-center">
          <button className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {/* Dropdown */}
          <div className="absolute right-0 top-full pt-2 w-36 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
            <div className="rounded-xl border border-gray-100 bg-white shadow-lg">
              <div className="flex flex-col p-1">
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}