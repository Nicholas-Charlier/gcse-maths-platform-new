// app/meet-madison/page.tsx
export default function MeetMadison() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      {/* Photo placeholder */}
      <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center mb-8">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-2">Meet Madison</h1>
      <p className="text-blue-300 font-semibold text-lg mb-6">Maths Tutor & Founder</p>

      <p className="text-gray-500 text-lg leading-relaxed">
        Madison has been passionate about maths from a young age — starting her tutoring journey at just 16. Since then, she has accumulated hundreds of hours of one-to-one tutoring experience, helping students across GCSE and IGCSE achieve grades they never thought possible. Her approach is patient, structured, and laser-focused on what examiners actually want to see. Maths with Madison was built to bring that same expertise to students everywhere.
      </p>
    </main>
  );
}