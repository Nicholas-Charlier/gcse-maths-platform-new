"use client";

import Link from "next/link";
import { useState } from "react";
import { useFirstName } from "@/app/lib/hooks/useFirstName";

const features = [
  { title: "Video Lessons", description: "Step-by-step video lessons covering every GCSE & IGCSE topic, taught by Madison. Watch at your own pace, rewind as many times as you need.", detail: ["Every topic on the specification", "Taught by an expert tutor", "Watch at your own pace"], preview: "lessons" },
  { title: "Exercises", description: "Hundreds of carefully graded exercises organised by topic and difficulty. Build confidence gradually with instant feedback on every answer.", detail: ["Graded by difficulty", "Organised by topic", "Instant feedback on every answer"], preview: "exercises" },
  { title: "Worked Examples", description: "Fully worked solutions showing exactly how to lay out your working — the way examiners want to see it.", detail: ["Examiner-style working", "Step-by-step breakdowns", "Model answers"], preview: "worked" },
  { title: "Practice Papers", description: "Full past papers and mock exams with mark schemes. Track your scores over time and identify the topics that need more work.", detail: ["Full past papers", "Mark schemes included", "Score tracking"], preview: "papers" },
  { title: "Flashcards", description: "Smart flashcard decks covering formulas, definitions, and key concepts. Perfect for squeezing revision into small pockets of time.", detail: ["Key formulas & definitions", "Quick-fire revision", "Always accessible"], preview: "flashcards" },
];

const featureSections = [
  { label: "Video Lessons", heading: "Learn from an expert, at your own pace.", description: "Every video is recorded by Madison — a tutor with hundreds of hours of one-to-one experience. Clear, structured, and designed around what examiners actually want to see.", bullets: ["Every GCSE & IGCSE topic covered", "Taught by an experienced tutor", "Rewatch anytime, on any device"], flip: false, preview: "lessons" },
  { label: "Exercises", heading: "Practice that covers the whole syllabus.", description: "Hand-picked exercises designed to test you on every corner of the specification. Graded by difficulty so you can build confidence before tackling the harder material.", bullets: ["Covers the full syllabus", "Graded by difficulty", "Instant feedback on every answer"], flip: true, preview: "exercises" },
  { label: "Worked Examples", heading: "Never stare at a question not knowing where to start.", description: "Madison takes the hardest questions that trip students up and breaks them down in a digestible way. So when it comes to the real thing, you'll always know how to begin.", bullets: ["Hardest exam questions broken down", "Step-by-step approach", "Taught the way examiners want it"], flip: false, preview: "worked" },
  { label: "Prediction Papers", heading: "Papers built around what's likely to come up.", description: "Carefully produced by analysing past papers and examiner reports. Each prediction paper puts you in the best possible position for the real thing.", bullets: ["Based on real past paper patterns", "Full mark schemes included", "Timed exam conditions"], flip: true, preview: "papers" },
  { label: "Flashcards", heading: "Quick-fire revision, anywhere.", description: "Bite-sized flashcard decks covering key formulas, definitions, and concepts. Perfect for squeezing revision into small pockets of time — on the bus, between lessons, the night before.", bullets: ["Key formulas & definitions", "Topic-by-topic decks", "Quick and effective"], flip: false, preview: "flashcards" },
];

const testimonials = [
  { quote: "The worked examples changed everything. I used to stare at hard questions and not know where to start. Now I always have a method.", name: "Aisha T.", detail: "GCSE Student · Grade 9" },
  { quote: "Madison explains things exactly the way examiners want to see it — that made a huge difference in my mock results.", name: "James R.", detail: "IGCSE Student · Grade 8" },
  { quote: "The flashcards are perfect for last-minute revision. I went through every formula the night before and felt completely prepared.", name: "Priya M.", detail: "GCSE Student · Grade 9" },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sage mb-5">{children}</p>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-3 text-[14px] text-white/65">
    <span className="w-1 h-1 rounded-full bg-sage flex-shrink-0" />
    {children}
  </li>
);

const previewShell = "w-full max-w-xs mx-auto rounded-2xl p-5 bg-white/[0.025] border border-white/[0.07] backdrop-blur-sm";

const LessonsPreview = () => (
  <div className={previewShell}>
    <p className="text-[10px] font-semibold text-sage uppercase tracking-widest mb-4">Now playing</p>
    <div className="rounded-xl h-24 flex items-center justify-center mb-4 bg-sage/[0.07] border border-white/5"><span className="text-sage text-2xl">▶</span></div>
    <p className="font-serif text-[16px] text-white/90 mb-1">Quadratic equations</p>
    <p className="text-[12px] text-white/40">Algebra · 14 min</p>
  </div>
);
const ExercisesPreview = () => (
  <div className={previewShell}>
    <p className="text-[10px] font-semibold text-sage uppercase tracking-widest mb-3">Exercise · Number</p>
    <p className="text-[13px] text-white/75 leading-relaxed mb-4">Calculate 3.6 × 10⁴ ÷ (1.2 × 10²), giving your answer in standard form.</p>
    <div className="flex gap-2 mb-3">
      <div className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-[12px] text-white/35 bg-white/[0.02]">Your answer…</div>
      <div className="rounded-lg px-4 py-2 text-[12px] font-medium text-[#0C0E0C] bg-sage">Check</div>
    </div>
    <p className="text-[11px] text-white/35">Question 1 of 12</p>
  </div>
);
const WorkedPreview = () => (
  <div className={previewShell}>
    <p className="text-[10px] font-semibold text-sage uppercase tracking-widest mb-3">Worked example</p>
    <p className="text-[13px] font-medium text-white/90 mb-4 font-mono">Solve: x² − 5x + 6 = 0</p>
    <div className="space-y-2.5">
      {["Factorise: (x − 2)(x − 3) = 0", "Set each factor to zero", "x = 2  or  x = 3"].map((s, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <span className="w-4 h-4 rounded-full bg-sage/15 text-sage text-[9px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
          <span className="text-[12px] text-white/70 font-mono">{s}</span>
        </div>
      ))}
    </div>
  </div>
);
const PapersPreview = () => (
  <div className={previewShell}>
    <div className="flex justify-between items-center mb-3">
      <span className="text-[10px] font-semibold text-sage uppercase tracking-widest">Practice paper</span>
      <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-sage" /><div className="w-1.5 h-1.5 rounded-full bg-sage" /><div className="w-1.5 h-1.5 rounded-full bg-white/15" /></div>
    </div>
    <p className="text-[13px] text-white/75 leading-relaxed mb-4">A ball is dropped from 5 m. Each bounce reaches 89% of previous height.<br /><br />(a) Height after 2nd bounce. [2]<br />(b) Total distance after 5 bounces. [3]</p>
    <div className="flex gap-2 pt-3 border-t border-white/10">
      <span className="text-[11px] font-medium text-sage bg-sage/10 px-2.5 py-1 rounded-md">Mark Scheme</span>
      <span className="text-[11px] font-medium text-white/50 bg-white/5 px-2.5 py-1 rounded-md">Video Solution</span>
    </div>
  </div>
);
const FlashcardsPreview = () => (
  <div className={`${previewShell} text-center`}>
    <p className="text-[10px] font-semibold text-sage uppercase tracking-widest mb-3">Flashcard · Algebra</p>
    <p className="text-[14px] font-medium text-white/90 mb-3">What is the quadratic formula?</p>
    <div className="rounded-xl p-3 text-[12px] text-white/75 font-mono leading-relaxed bg-sage/[0.07] border border-white/5">x = (−b ± √(b² − 4ac)) / 2a</div>
    <div className="flex justify-center gap-1.5 mt-4">{[true, true, true, false, false].map((d, i) => (<div key={i} className={`w-1.5 h-1.5 rounded-full ${d ? "bg-sage" : "bg-white/15"}`} />))}</div>
  </div>
);

const previewMap: Record<string, React.ReactNode> = {
  lessons: <LessonsPreview />, exercises: <ExercisesPreview />, worked: <WorkedPreview />, papers: <PapersPreview />, flashcards: <FlashcardsPreview />,
};

export default function Home() {
  const [active, setActive] = useState(0);
  const { firstName, loading } = useFirstName();

  const primaryHref = !loading && firstName ? "/dashboard" : "/signup";
  const primaryLabel = loading ? "Get started" : firstName ? "Go to Dashboard" : "Start for free";

  return (
    <main className="min-h-screen bg-red-500 text-foreground overflow-hidden">

      {/* Hero — atmospheric. Drop a real photo into .hero-atmosphere later. */}
      <section className="relative grain hero-atmosphere px-6 pt-28 pb-24">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Eyebrow>GCSE &amp; IGCSE Maths</Eyebrow>
          <h1 className="font-serif text-6xl md:text-7xl leading-[1.02] tracking-tight mb-7">
            Get ahead.<br />Get a <span className="italic text-sage">9</span>.
          </h1>
          <p className="text-[17px] text-white/60 leading-relaxed max-w-md mx-auto mb-10">
            The complete maths programme designed by an expert tutor to get you ahead of the competition.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href={primaryHref} className="inline-flex items-center gap-2 bg-sage text-[#0C0E0C] font-medium text-[15px] px-8 py-3.5 rounded-full hover:bg-sage-bright transition-colors">
              {primaryLabel}<span aria-hidden>→</span>
            </Link>
            {!loading && !firstName && (
              <Link href="/pricing" className="inline-flex items-center text-white/80 font-medium text-[15px] px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-colors">
                View pricing
              </Link>
            )}
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto mt-20 flex flex-wrap justify-center gap-x-16 gap-y-8">
          {[{ num: "9", desc: "Target grade" }, { num: "100%", desc: "Spec coverage" }, { num: "5", desc: "Resource types" }, { num: "24/7", desc: "Any device" }].map((s) => (
            <div key={s.num} className="text-center">
              <div className="font-serif text-3xl text-white">{s.num}</div>
              <div className="text-[12px] text-white/45 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-white/[0.06] mx-6" />

      {/* Why MWM */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Why Maths with Madison?</h2>
            <p className="text-white/55 text-[17px]">Everything you need to hit a 9, in one place.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex md:flex-col gap-1 md:w-56 flex-shrink-0 flex-wrap">
              {features.map((f, i) => (
                <button key={f.title} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
                  className="px-4 py-3 rounded-xl text-left text-[14px] transition-all duration-150"
                  style={active === i ? { background: "rgba(255,255,255,0.05)", color: "#F4F5F2", fontWeight: 500 } : { color: "rgba(244,245,242,0.45)" }}>
                  {f.title}
                </button>
              ))}
            </div>
            <div key={active} className="flex-1 rounded-2xl p-9 animate-fadeIn bg-white/[0.025] border border-white/[0.07]">
              <h3 className="font-serif text-2xl text-white mb-4">{features[active].title}</h3>
              <p className="text-white/60 text-[15px] leading-relaxed mb-7 max-w-xl">{features[active].description}</p>
              <ul className="flex flex-col gap-3">{features[active].detail.map((d) => (<Bullet key={d}>{d}</Bullet>))}</ul>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.06] mx-6" />

      {/* Feature rows */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Everything you need, built in.</h2>
            <p className="text-white/55 text-[17px]">A complete revision toolkit — no extra resources needed.</p>
          </div>
          <div className="flex flex-col gap-24">
            {featureSections.map((f) => (
              <div key={f.label} className={`flex flex-col gap-10 md:gap-16 items-center ${f.flip ? "md:flex-row-reverse" : "md:flex-row"}`}>
                <div className="md:w-1/2 flex justify-center">{previewMap[f.preview]}</div>
                <div className="md:w-1/2">
                  <Eyebrow>{f.label}</Eyebrow>
                  <h3 className="font-serif text-3xl leading-snug tracking-tight mb-4">{f.heading}</h3>
                  <p className="text-white/60 text-[15px] leading-relaxed mb-6 max-w-md">{f.description}</p>
                  <ul className="flex flex-col gap-3">{f.bullets.map((b) => (<Bullet key={b}>{b}</Bullet>))}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.06] mx-6" />

      {/* Testimonials */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <Eyebrow>Student reviews</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-4">Students who used it, loved it.</h2>
          <p className="text-white/55 text-[17px] mb-16">Real feedback from GCSE &amp; IGCSE students.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl p-7 bg-white/[0.025] border border-white/[0.07]">
                <p className="font-serif text-[17px] italic text-white/85 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-white text-[14px] font-medium">{t.name}</p>
                <p className="text-white/40 text-[12px] mt-0.5">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative grain hero-atmosphere px-6 py-32 text-center">
        <div className="relative z-10">
          <Eyebrow>Get started today</Eyebrow>
          <h2 className="font-serif text-5xl md:text-6xl tracking-tight mb-5 max-w-xl mx-auto">
            Ready to get your <span className="italic text-sage">9</span>?
          </h2>
          <p className="text-white/55 text-[17px] mb-10">Join students already using Maths with Madison to get ahead.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href={primaryHref} className="inline-flex items-center gap-2 bg-sage text-[#0C0E0C] font-medium text-[15px] px-9 py-4 rounded-full hover:bg-sage-bright transition-colors">
              {primaryLabel}<span aria-hidden>→</span>
            </Link>
            {!loading && !firstName && (
              <Link href="/pricing" className="inline-flex items-center text-white/80 font-medium text-[15px] px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-colors">
                View pricing
              </Link>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}