"use client";

import Link from "next/link";
import { useState } from "react";
import { useFirstName } from "@/app/lib/hooks/useFirstName";
import Image from "next/image";

const VideoIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#dbeafe" />
    <rect x="6" y="11" width="16" height="14" rx="3" fill="#93c5fd" />
    <path d="M24 15.5l5.5-3v11l-5.5-3V15.5z" fill="#3b82f6" />
    <rect x="9" y="14" width="7" height="1.5" rx="0.75" fill="white" opacity="0.6" />
    <rect x="9" y="17" width="5" height="1.5" rx="0.75" fill="white" opacity="0.4" />
  </svg>
);

const ExercisesIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#dcfce7" />
    <rect x="7" y="8" width="15" height="19" rx="3" fill="#86efac" />
    <rect x="9" y="8" width="15" height="19" rx="3" fill="white" stroke="#bbf7d0" strokeWidth="1.5" />
    <line x1="12" y1="15" x2="21" y2="15" stroke="#16a34a" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="12" y1="19" x2="18" y2="19" stroke="#4ade80" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="12" y1="23" x2="20" y2="23" stroke="#4ade80" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="25" cy="23" r="4" fill="#16a34a" />
    <line x1="23.5" y1="23" x2="26.5" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="25" y1="21.5" x2="25" y2="24.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WorkedExamplesIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#fef3c7" />
    <rect x="6" y="9" width="24" height="18" rx="3" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    <text x="9" y="22" fontSize="10" fontWeight="800" fill="#d97706" fontFamily="serif">x²</text>
    <line x1="19" y1="18" x2="23" y2="18" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="16" x2="21" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    <text x="24" y="22" fontSize="9" fontWeight="700" fill="#d97706" fontFamily="serif">9</text>
  </svg>
);

const PapersIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#fee2e2" />
    <rect x="7" y="9" width="16" height="20" rx="3" fill="#fca5a5" />
    <rect x="10" y="7" width="16" height="20" rx="3" fill="white" stroke="#fecaca" strokeWidth="1.5" />
    <line x1="13" y1="14" x2="23" y2="14" stroke="#ef4444" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="13" y1="18" x2="23" y2="18" stroke="#fca5a5" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="13" y1="22" x2="19" y2="22" stroke="#fca5a5" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const FlashcardsIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#ede9fe" />
    <rect x="5" y="12" width="18" height="12" rx="3" fill="#c4b5fd" transform="rotate(-6 5 12)" />
    <rect x="10" y="13" width="18" height="12" rx="3" fill="white" stroke="#ddd6fe" strokeWidth="1.5" />
    <line x1="14" y1="18" x2="24" y2="18" stroke="#7c3aed" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="14" y1="21" x2="20" y2="21" stroke="#c4b5fd" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const features = [
  {
    icon: <VideoIcon />, largeIcon: <VideoIcon size={48} />,
    title: "Video Lessons", color: "#3b82f6", bg: "#dbeafe", textColor: "#1e3a6e",
    description: "Step-by-step video lessons covering every GCSE & IGCSE topic, taught by Madison. Watch at your own pace, rewind as many times as you need.",
    detail: ["Every topic on the specification", "Taught by an expert tutor", "Watch at your own pace"],
  },
  {
    icon: <ExercisesIcon />, largeIcon: <ExercisesIcon size={48} />,
    title: "Exercises", color: "#16a34a", bg: "#dcfce7", textColor: "#14532d",
    description: "Hundreds of carefully graded exercises organised by topic and difficulty. Build confidence gradually with instant feedback on every answer.",
    detail: ["Graded by difficulty", "Organised by topic", "Instant feedback on every answer"],
  },
  {
    icon: <WorkedExamplesIcon />, largeIcon: <WorkedExamplesIcon size={48} />,
    title: "Worked Examples", color: "#f59e0b", bg: "#fef3c7", textColor: "#78350f",
    description: "Fully worked solutions showing exactly how to lay out your working — the way examiners want to see it.",
    detail: ["Examiner-style working", "Step-by-step breakdowns", "Model answers"],
  },
  {
    icon: <PapersIcon />, largeIcon: <PapersIcon size={48} />,
    title: "Practice Papers", color: "#ef4444", bg: "#fee2e2", textColor: "#7f1d1d",
    description: "Full past papers and mock exams with mark schemes. Track your scores over time and identify the topics that need more work.",
    detail: ["Full past papers", "Mark schemes included", "Score tracking"],
  },
  {
    icon: <FlashcardsIcon />, largeIcon: <FlashcardsIcon size={48} />,
    title: "Flashcards", color: "#7c3aed", bg: "#ede9fe", textColor: "#3b0764",
    description: "Smart flashcard decks covering formulas, definitions, and key concepts. Perfect for squeezing revision into small pockets of time.",
    detail: ["Key formulas & definitions", "Quick-fire revision", "Always accessible"],
  },
];

const featureSections = [
  {
    label: "Video Lessons", tagColor: "#1d4ed8", tagBg: "#dbeafe",
    mediaBg: "linear-gradient(135deg,#eff6ff,#dbeafe)", bulletColor: "#1e3a6e", dotColor: "#3b82f6",
    heading: "Learn from an expert, at your own pace.",
    description: "Every video is recorded by Madison — a tutor with hundreds of hours of one-to-one experience. Clear, structured, and designed around what examiners actually want to see.",
    bullets: ["Every GCSE & IGCSE topic covered", "Taught by an experienced tutor", "Rewatch anytime, on any device"],
    flip: false, preview: "lessons",
  },
  {
    label: "Exercises", tagColor: "#14532d", tagBg: "#dcfce7",
    mediaBg: "linear-gradient(135deg,#f0fdf4,#dcfce7)", bulletColor: "#14532d", dotColor: "#16a34a",
    heading: "Practice that covers the whole syllabus.",
    description: "Hand-picked exercises designed to test you on every corner of the specification. Graded by difficulty so you can build confidence before tackling the harder material.",
    bullets: ["Covers the full syllabus", "Graded by difficulty", "Instant feedback on every answer"],
    flip: true, preview: "exercises",
  },
  {
    label: "Worked Examples", tagColor: "#92400e", tagBg: "#fef3c7",
    mediaBg: "linear-gradient(135deg,#fffbeb,#fef3c7)", bulletColor: "#78350f", dotColor: "#f59e0b",
    heading: "Never stare at a question not knowing where to start.",
    description: "Madison takes the hardest questions that trip students up and breaks them down in a digestible, understandable way. So when it comes to the real thing, you'll always know how to begin.",
    bullets: ["Hardest exam questions broken down", "Step-by-step approach", "Taught the way examiners want to see it"],
    flip: false, preview: "worked",
  },
  {
    label: "Prediction Papers", tagColor: "#991b1b", tagBg: "#fee2e2",
    mediaBg: "linear-gradient(135deg,#fef2f2,#fee2e2)", bulletColor: "#7f1d1d", dotColor: "#ef4444",
    heading: "Papers built around what's likely to come up.",
    description: "Carefully produced by analysing past papers and examiner reports. Each prediction paper is designed to put you in the best possible position for the real thing.",
    bullets: ["Based on real past paper patterns", "Full mark schemes included", "Timed exam conditions"],
    flip: true, preview: "papers",
  },
  {
    label: "Flashcards", tagColor: "#5b21b6", tagBg: "#ede9fe",
    mediaBg: "linear-gradient(135deg,#f5f3ff,#ede9fe)", bulletColor: "#3b0764", dotColor: "#7c3aed",
    heading: "Quick-fire revision, anywhere.",
    description: "Bite-sized flashcard decks covering key formulas, definitions, and concepts. Perfect for squeezing revision into small pockets of time — on the bus, between lessons, the night before.",
    bullets: ["Key formulas & definitions", "Topic-by-topic decks", "Quick and effective"],
    flip: false, preview: "flashcards",
  },
];

const testimonials = [
  { quote: "The worked examples changed everything. I used to stare at hard questions and not know where to start. Now I always have a method.", name: "Aisha T.", detail: "GCSE Student · Grade 9" },
  { quote: "Madison explains things exactly the way examiners want to see it — that made a huge difference in my mock results.", name: "James R.", detail: "IGCSE Student · Grade 8" },
  { quote: "The flashcards are perfect for last-minute revision. I went through every formula the night before and felt completely prepared.", name: "Priya M.", detail: "GCSE Student · Grade 9" },
];

const LessonsPreview = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-blue-100 p-4 shadow-lg shadow-blue-100/60">
    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">Video Lessons</p>
    <div className="grid grid-cols-2 gap-2">
      {["Number", "Algebra", "Ratio", "Graphs"].map((t) => (
        <div key={t} className="bg-white rounded-xl border border-slate-100 p-3 flex flex-col items-center gap-2 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="text-blue-500 font-black text-xs font-serif">{t[0]}</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-800">{t}</span>
        </div>
      ))}
    </div>
  </div>
);

const ExercisesPreview = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-green-100 p-5 shadow-lg shadow-green-100/60">
    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-3">Exercise · Number</p>
    <p className="text-[12px] text-slate-700 leading-relaxed mb-4">Calculate 3.6 × 10⁴ ÷ (1.2 × 10²), giving your answer in standard form.</p>
    <div className="flex gap-2 mb-3">
      <div className="flex-1 bg-slate-50 rounded-lg border border-slate-200 px-3 py-2 text-[11px] text-slate-400">Your answer...</div>
      <div className="bg-green-600 rounded-lg px-3 py-2 text-[11px] font-semibold text-white">Check</div>
    </div>
    <p className="text-[10px] text-slate-400">Question 1 of 12</p>
  </div>
);

const WorkedPreview = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-amber-100 p-5 shadow-lg shadow-amber-100/60">
    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3">Worked Example</p>
    <p className="text-[12px] font-semibold text-slate-800 mb-3">Solve: x² − 5x + 6 = 0</p>
    <div className="space-y-2">
      {["Factorise: (x − 2)(x − 3) = 0", "Set each factor to zero", "x = 2  or  x = 3"].map((s, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
          <span className="text-[11px] text-slate-700 font-mono">{s}</span>
        </div>
      ))}
    </div>
  </div>
);

const PapersPreview = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-red-100 p-5 shadow-lg shadow-red-100/60">
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Practice Paper</span>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-red-400" /><div className="w-2 h-2 rounded-full bg-slate-200" />
      </div>
    </div>
    <p className="text-[12px] text-slate-700 leading-relaxed mb-3">
      A ball is dropped from 5 m. Each bounce reaches 89% of previous height.<br /><br />
      (a) Height after 2nd bounce. [2]<br />(b) Total distance after 5 bounces. [3]
    </p>
    <div className="flex gap-2 pt-3 border-t border-slate-100">
      <span className="text-[11px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded-md">Mark Scheme</span>
      <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2 py-1 rounded-md">Video Solution</span>
    </div>
  </div>
);

const FlashcardsPreview = () => (
  <div className="w-full max-w-xs mx-auto bg-white rounded-2xl border border-purple-100 p-5 shadow-lg shadow-purple-100/60 text-center">
    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-3">Flashcard · Algebra</p>
    <p className="text-[13px] font-semibold text-slate-800 mb-3">What is the quadratic formula?</p>
    <div className="bg-purple-50 rounded-xl p-3 text-[12px] text-slate-700 font-mono leading-relaxed">
      x = (−b ± √(b² − 4ac)) / 2a
    </div>
    <div className="flex justify-center gap-1 mt-4">
      {[true, true, true, false, false].map((done, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${done ? "bg-purple-500" : "bg-purple-200"}`} />
      ))}
    </div>
  </div>
);

const previewMap: Record<string, React.ReactNode> = {
  lessons: <LessonsPreview />,
  exercises: <ExercisesPreview />,
  worked: <WorkedPreview />,
  papers: <PapersPreview />,
  flashcards: <FlashcardsPreview />,
};

export default function Home() {
  const [active, setActive] = useState(0);
  const { firstName, loading } = useFirstName();

  return (
    <main className="min-h-screen flex flex-col">

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center pt-60 pb-76 px-6 w-full overflow-hidden">
        <Image
          src="/blue empty classroom.jpeg"
          alt="Classroom background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-60" />


        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-7xl font-black text-blue-50 leading-[1.07] tracking-tight max-w-2xl mb-5">
            Get Ahead.<br />Get a <span className="text-blue-400">9.</span>
          </h1>

          <p className="text-lg text-white/90 max-w-md leading-relaxed mb-10 font-medium">
            The complete GCSE and IGCSE maths programme designed by an expert tutor to get you ahead of the competition.
          </p>

          <div className="flex items-center gap-3 mb-16">
            <Link
              href={!loading && firstName ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-[17px] px-8 py-3.5 rounded-xl shadow-2xl hover:bg-slate-50 transition-colors"
            >
              {loading ? "Get started" : firstName ? "Go to Dashboard" : "Start for free"}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#0f1c38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>

          </div>
        </div>


      </section>

      {/* Why MWM */}
      <section className="pt-24 pb-20 px-6 w-full bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-2">Why choose us</p>
          <h2 className="text-4xl font-black text-slate-900 mb-2">Why Maths with Madison?</h2>
          <p className="text-slate-500 text-lg mb-12">Everything you need to hit a 9, in one place.</p>

          <div className="flex gap-5">
            <div className="flex flex-col gap-1 w-52 flex-shrink-0">
              {features.map((f, i) => (
                <button key={f.title} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                  style={active === i ? { background: "#fff", boxShadow: "0 1px 8px rgba(15,28,56,0.08)" } : {}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: active === i ? f.bg : "#e4eaf4" }}>
                    {f.icon}
                  </div>
                  <span className="text-[13.5px]" style={{ color: active === i ? "#0f1c38" : "#7a8fa8", fontWeight: active === i ? 600 : 500 }}>
                    {f.title}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-slate-200 overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(15,28,56,0.06)" }}>
              <div className="h-1.5 w-full transition-colors duration-200" style={{ background: features[active].color }} />
              <div key={active} className="p-9 animate-fadeIn">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: features[active].bg }}>
                  {features[active].largeIcon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{features[active].title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-5">{features[active].description}</p>
                <ul className="flex flex-col gap-2.5">
                  {features[active].detail.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: features[active].textColor }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: features[active].bg }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke={features[active].color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature rows */}
      <section className="py-20 px-6 w-full bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-2">What's included</p>
            <h2 className="text-4xl font-black text-slate-900 mb-3">Everything you need, built in.</h2>
            <p className="text-slate-500 text-lg">A complete revision toolkit — no extra resources needed.</p>
          </div>

          <div className="flex flex-col gap-5">
            {featureSections.map((f) => (
              <div key={f.label}
                className={`flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden ${f.flip ? "md:flex-row-reverse" : ""}`}
                style={{ boxShadow: "0 4px 24px rgba(15,28,56,0.07)", border: "1px solid #e8ecf2" }}>
                <div className="md:w-[46%] flex items-center justify-center p-10 min-h-[260px]"
                  style={{ background: f.mediaBg }}>
                  {previewMap[f.preview]}
                </div>
                <div className="flex-1 bg-white p-10 flex flex-col justify-center">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md mb-3.5"
                    style={{ color: f.tagColor, background: f.tagBg }}>
                    {f.label}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug mb-3">{f.heading}</h3>
                  <p className="text-slate-500 text-[14.5px] leading-relaxed mb-5">{f.description}</p>
                  <ul className="flex flex-col gap-2">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-[13.5px] font-medium" style={{ color: f.bulletColor }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.dotColor }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 w-full relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0a1628 0%,#0f1c38 50%,#0d2247 100%)" }}>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)", transform: "translate(20%,20%)" }} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-2">Student reviews</p>
          <h2 className="text-4xl font-black text-white mb-3">Students who used it, loved it.</h2>
          <p className="text-slate-500 text-lg mb-12">Real feedback from GCSE &amp; IGCSE students.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-slate-300 text-[14.5px] leading-[1.72] mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-slate-600 text-xs mt-0.5">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 w-full bg-slate-50 text-center">
        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">Get started today</p>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 max-w-lg mx-auto">Ready to get your 9?</h2>
        <p className="text-slate-500 text-lg mb-10">Join students already using Maths with Madison to get ahead.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href={!loading && firstName ? "/dashboard" : "/signup"}
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(15,28,56,0.2)" }}>
            {loading ? "Get started" : firstName ? "Go to Dashboard" : "Start for free"} →
          </Link>
          {!loading && !firstName && (
            <Link href="/pricing"
              className="inline-flex items-center bg-white text-slate-800 font-semibold text-[15px] px-7 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
              style={{ border: "1.5px solid #dde2ea" }}>
              View pricing
            </Link>
          )}
        </div>
      </section>

    </main>
  );
}