"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/app/lib/hooks/useUser";

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
    <rect width="36" height="36" rx="10" fill="#dbeafe" />
    <rect x="7" y="8" width="15" height="19" rx="3" fill="#93c5fd" />
    <rect x="9" y="8" width="15" height="19" rx="3" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
    <line x1="12" y1="15" x2="21" y2="15" stroke="#3b82f6" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="12" y1="19" x2="18" y2="19" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="12" y1="23" x2="20" y2="23" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
    <circle cx="25" cy="23" r="4" fill="#3b82f6" />
    <line x1="23.5" y1="23" x2="26.5" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="25" y1="21.5" x2="25" y2="24.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WorkedExamplesIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#dbeafe" />
    <rect x="6" y="9" width="24" height="18" rx="3" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
    <text x="9" y="22" fontSize="10" fontWeight="800" fill="#3b82f6" fontFamily="serif">x²</text>
    <line x1="19" y1="18" x2="23" y2="18" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="21" y1="16" x2="21" y2="20" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
    <text x="24" y="22" fontSize="9" fontWeight="700" fill="#60a5fa" fontFamily="serif">9</text>
    <line x1="9" y1="25" x2="27" y2="25" stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" />
    <line x1="9" y1="28" x2="20" y2="28" stroke="#bfdbfe" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const PapersIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#dbeafe" />
    <rect x="7" y="9" width="16" height="20" rx="3" fill="#93c5fd" />
    <rect x="10" y="7" width="16" height="20" rx="3" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
    <line x1="13" y1="14" x2="23" y2="14" stroke="#3b82f6" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="13" y1="18" x2="23" y2="18" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="13" y1="22" x2="19" y2="22" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M22 20l2 2-2 2" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlashcardsIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="#dbeafe" />
    <rect x="5" y="12" width="18" height="12" rx="3" fill="#93c5fd" transform="rotate(-6 5 12)" />
    <rect x="10" y="13" width="18" height="12" rx="3" fill="white" stroke="#bfdbfe" strokeWidth="1.5" />
    <line x1="14" y1="18" x2="24" y2="18" stroke="#3b82f6" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="14" y1="21" x2="20" y2="21" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
);

const features = [
  {
    icon: <VideoIcon />,
    largeIcon: <VideoIcon size={52} />,
    title: "Video Lessons",
    description:
      "Step-by-step video lessons covering every GCSE & IGCSE topic, taught by Madison. Watch at your own pace, rewind as many times as you need.",
    detail: ["Every topic on the specification", "Taught by an expert tutor", "Watch at your own pace"],
  },
  {
    icon: <ExercisesIcon />,
    largeIcon: <ExercisesIcon size={52} />,
    title: "Exercises",
    description:
      "Hundreds of carefully graded exercises organised by topic and difficulty. Build confidence gradually with instant feedback on every answer.",
    detail: ["Graded by difficulty", "Organised by topic", "Instant feedback"],
  },
  {
    icon: <WorkedExamplesIcon />,
    largeIcon: <WorkedExamplesIcon size={52} />,
    title: "Worked Examples",
    description:
      "Fully worked solutions showing exactly how to lay out your working — the way examiners want to see it.",
    detail: ["Examiner-style working", "Step-by-step breakdowns", "Model answers"],
  },
  {
    icon: <PapersIcon />,
    largeIcon: <PapersIcon size={52} />,
    title: "Practice Papers",
    description:
      "Full past papers and mock exams with mark schemes. Track your scores over time and identify the topics that need more work.",
    detail: ["Full past papers", "Mark schemes included", "Score tracking"],
  },
  {
    icon: <FlashcardsIcon />,
    largeIcon: <FlashcardsIcon size={52} />,
    title: "Flashcards",
    description:
      "Smart flashcard decks covering formulas, definitions, and key concepts. Perfect for squeezing revision into small pockets of time.",
    detail: ["Key formulas & definitions", "Quick-fire revision", "Always accessible"],
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const { firstName } = useUser();

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <section className="flex flex-col items-center pt-32 pb-32 px-6">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center max-w-3xl leading-tight">
          Get Ahead. Get a 9.{" "}
          <span className="text-blue-300">GCSE & IGCSE Maths.</span>
        </h1>
        <p className="mt-6 text-center text-lg text-gray-500 max-w-xl leading-relaxed">
          The complete maths programme designed by an expert tutor to get you ahead of the competition.
        </p>
        {firstName ? (
          <Link
            href="/dashboard"
            className="mt-10 rounded-full bg-blue-300 px-8 py-3 text-white font-semibold text-lg hover:bg-blue-400 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            href="/signup"
            className="mt-10 rounded-full bg-blue-300 px-8 py-3 text-white font-semibold text-lg hover:bg-blue-400 transition-colors"
          >
            Learn with us
          </Link>
        )}
      </section>

      {/* Features */}
      <section className="py-32 px-6 w-full bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Why Maths with Madison?
          </h2>
          <p className="text-gray-500 text-lg mb-16">
            Everything you need to hit a 9, in one place.
          </p>

          <div className="flex gap-12">
            {/* Left list */}
            <div className="flex flex-col gap-3 min-w-[260px]">
              {features.map((f, i) => (
                <button
                  key={f.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-200 ${
                    active === i
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span>{f.icon}</span>
                  <span className="text-base font-medium">{f.title}</span>
                  {active === i && (
                    <span className="ml-auto text-blue-400 text-lg">→</span>
                  )}
                </button>
              ))}
            </div>

            {/* Right panel */}
            <div className="flex-1 rounded-3xl bg-blue-50 p-12">
              <div key={active} className="animate-fadeIn">
                <div className="mb-6">{features[active].largeIcon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {features[active].title}
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                  {features[active].description}
                </p>
                <ul className="flex flex-col gap-3">
                  {features[active].detail.map((d) => (
                    <li key={d} className="flex items-center gap-3 text-base text-blue-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-400 inline-block shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}