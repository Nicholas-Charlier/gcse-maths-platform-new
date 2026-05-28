"use client";

import { useUser } from "@/app/lib/hooks/useUser";

const plans = [
  {
    key: "free",
    name: "Free",
    price: "£0",
    period: "forever",
    description: "A taster to see what we're about.",
    features: [
      { text: "5 video lessons", included: true },
      { text: "2 exercise sets", included: true },
      { text: "2 flashcard decks", included: true },
      { text: "Full topic library", included: false },
      { text: "Practice papers", included: false },
      { text: "Worked examples", included: false },
      { text: "New content as it drops", included: false },
    ],
    highlight: false,
    badge: null,
  },
  {
    key: "monthly",
    name: "Monthly",
    price: "£19.99",
    period: "per month",
    description: "Full access, cancel any time.",
    features: [
      { text: "5 video lessons", included: true },
      { text: "2 exercise sets", included: true },
      { text: "2 flashcard decks", included: true },
      { text: "Full topic library", included: true },
      { text: "Practice papers", included: true },
      { text: "Worked examples", included: true },
      { text: "New content as it drops", included: true },
    ],
    highlight: false,
    badge: null,
  },
  {
    key: "yearly",
    name: "Yearly",
    price: "£149.99",
    period: "per year",
    description: "Everything, at the best price.",
    features: [
      { text: "5 video lessons", included: true },
      { text: "2 exercise sets", included: true },
      { text: "2 flashcard decks", included: true },
      { text: "Full topic library", included: true },
      { text: "Practice papers", included: true },
      { text: "Worked examples", included: true },
      { text: "New content as it drops", included: true },
    ],
    highlight: true,
    badge: "Best value",
  },
];

const CheckIcon = ({ included }: { included: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill={included ? "#bfdbfe" : "#f3f4f6"} />
    {included ? (
      <path
        d="M5.5 9l2.5 2.5 4.5-4.5"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M6 6l6 6M12 6l-6 6"
        stroke="#d1d5db"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    )}
  </svg>
);

export default function UpgradePage() {
  const { firstName, subscriptionTier, loading } = useUser();
  const currentTier = subscriptionTier ?? "free";

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-black text-gray-900 mb-3">
          {loading ? "Your plan." : `Your plan, ${firstName}.`}
        </h1>
        <p className="text-gray-500 text-lg mb-16">
          Upgrade any time. Cancel monthly plans whenever you like.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrent = currentTier === plan.key;

            return (
              <div
                key={plan.key}
                className={`relative flex flex-col rounded-2xl p-8 border transition-all ${
                  plan.highlight
                    ? "bg-gray-900 border-gray-900 text-white"
                    : "bg-white border-gray-100 text-gray-900"
                } ${isCurrent ? "ring-2 ring-blue-300" : ""}`}
              >
                {/* Badge */}
                {isCurrent ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-300 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Current plan
                  </span>
                ) : plan.badge ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-300 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                ) : null}

                {/* Plan name */}
                <p className={`text-sm font-semibold tracking-widest uppercase mb-6 ${plan.highlight ? "text-blue-300" : "text-gray-400"}`}>
                  {plan.name}
                </p>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-5xl font-black">{plan.price}</span>
                </div>
                <p className="text-sm mb-2 text-gray-400">{plan.period}</p>

                {/* Divider */}
                <div className={`w-full h-px my-6 ${plan.highlight ? "bg-gray-700" : "bg-gray-100"}`} />

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      <CheckIcon included={f.included} />
                      <span className={`text-sm ${
                        f.included
                          ? plan.highlight ? "text-white" : "text-gray-700"
                          : "text-gray-400"
                      }`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {isCurrent ? (
                  <button
                    disabled
                    className={`w-full text-center rounded-full py-3 text-sm font-semibold cursor-not-allowed opacity-40 ${
                      plan.highlight ? "bg-blue-300 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    Current plan
                  </button>
                ) : (
                  <button
                    disabled
                    className={`w-full text-center rounded-full py-3 text-sm font-semibold cursor-not-allowed opacity-50 ${
                      plan.highlight ? "bg-blue-300 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {plan.key === "free" ? "Downgrade" : "Upgrade"}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-400 text-sm mt-12">
          Yearly plan works out at £12.50/month — saving you £89.89 vs monthly.
        </p>
      </div>
    </main>
  );
}