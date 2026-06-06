export default function MeetMadison() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero */}
      <section
        className="relative w-full px-6 py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1c38 40%,#0d2247 100%)" }}
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)", transform: "translate(-30%,-30%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", transform: "translate(20%,30%)" }} />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          {/* Avatar */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="w-44 h-44 rounded-3xl flex items-center justify-center"
              style={{ background: "rgba(147,197,253,0.08)", border: "1px solid rgba(147,197,253,0.2)" }}>
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.5)"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg" style={{ fontFamily: "'Sora', sans-serif" }}>Madison</p>
              <p className="text-blue-400 text-sm font-medium">Maths Tutor &amp; Founder</p>
            </div>
          </div>

          {/* Intro text */}
          <div>
            <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">About</p>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}>
              Meet Madison.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Madison has been passionate about maths from a young age — starting her tutoring journey at just 16.
              Since then, she has accumulated hundreds of hours of one-to-one tutoring experience, helping students
              across GCSE and IGCSE achieve grades they never thought possible.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="w-full bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[
            { num: "16", label: "Age she started tutoring" },
            { num: "100s", label: "Hours of 1-to-1 experience" },
            { num: "GCSE & IGCSE", label: "Specs she knows inside out" },
            { num: "Grade 9", label: "What she'll help you achieve" },
          ].map((s) => (
            <div key={s.num} className="px-8 py-8 text-center">
              <div className="text-2xl font-black text-slate-900 mb-1"
                style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.02em" }}>{s.num}</div>
              <div className="text-xs text-slate-500 font-medium leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Approach section */}
      <section className="w-full bg-slate-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">Her approach</p>
          <h2 className="text-3xl font-black text-slate-900 mb-12"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}>
            Why students get results.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                color: "#3b82f6", bg: "#dbeafe", lightBg: "#eff6ff",
                title: "Examiner-focused",
                body: "Every lesson is built around what examiners actually want to see. Not just getting the right answer — but presenting it in a way that earns every mark.",
              },
              {
                color: "#16a34a", bg: "#dcfce7", lightBg: "#f0fdf4",
                title: "Patient & structured",
                body: "No student gets left behind. Madison breaks every topic down step by step, building genuine understanding rather than just memorising methods.",
              },
              {
                color: "#7c3aed", bg: "#ede9fe", lightBg: "#f5f3ff",
                title: "Built for confidence",
                body: "The goal isn't just a grade — it's walking into the exam room knowing you've prepared properly. That confidence comes from real, thorough practice.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-7 border border-slate-100"
                style={{ boxShadow: "0 4px 20px rgba(15,28,56,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: c.bg }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}>{c.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="w-full bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/2">
            <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">The story</p>
            <h2 className="text-3xl font-black text-slate-900 mb-6"
              style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.025em" }}>
              Why Maths with Madison exists.
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed mb-4">
              After years of one-to-one tutoring, Madison kept seeing the same pattern: students who were
              perfectly capable of a Grade 9 — but held back by gaps in their understanding, or simply not
              knowing how to present their working.
            </p>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Maths with Madison was built to fix that at scale. Every resource on the platform reflects the
              same approach Madison uses in her private lessons — structured, examiner-aware, and designed to
              build real confidence.
            </p>
          </div>

          <div className="md:w-1/2 flex flex-col gap-4">
            {[
              { tag: "The problem", tagColor: "#ef4444", tagBg: "#fee2e2", text: "Students capable of top grades being let down by presentation, gaps, and exam technique." },
              { tag: "The solution", tagColor: "#16a34a", tagBg: "#dcfce7", text: "A complete platform built around exactly how examiners mark — so nothing is left to chance." },
              { tag: "The result", tagColor: "#3b82f6", tagBg: "#dbeafe", text: "Students who walk into the exam room prepared, confident, and ready to get their 9." },
            ].map((item) => (
              <div key={item.tag} className="rounded-2xl border border-slate-100 p-6 flex gap-4 items-start"
                style={{ boxShadow: "0 2px 12px rgba(15,28,56,0.05)" }}>
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md flex-shrink-0"
                  style={{ color: item.tagColor, background: item.tagBg }}>{item.tag}</span>
                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 py-20 text-center"
        style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1c38 50%,#0d2247 100%)" }}>
        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">Get started</p>
        <h2 className="text-4xl font-black text-white mb-3 max-w-lg mx-auto"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}>
          Ready to learn with Madison?
        </h2>
        <p className="text-slate-400 text-lg mb-10">Join students already getting results.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="/signup"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-[15px] px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
            style={{ fontFamily: "'Sora', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            Start for free →
          </a>
          <a href="/pricing"
            className="inline-flex items-center text-blue-300 font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:text-blue-200 transition-colors"
            style={{ border: "1px solid rgba(147,197,253,0.3)" }}>
            View pricing
          </a>
        </div>
      </section>

    </main>
  );
}