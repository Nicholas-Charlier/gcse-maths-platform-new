import Link from "next/link";

export default function UpgradeSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M8 16l5 5 11-11"
              stroke="#93c5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">You're in.</h1>
        <p className="text-gray-500 mb-8">
          Your subscription is active. Full access to everything — let's get that 9.
        </p>
        <Link
          href="/dashboard"
          className="rounded-full bg-blue-300 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}