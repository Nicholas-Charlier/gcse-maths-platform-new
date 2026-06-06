// app/pricing/page.tsx
import Link from "next/link";

const plans = [
  {
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
    cta: "Get started free",
    ctaHref: "/signup",
    highlight: false,
    badge: null,
  },
  {
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
    cta: "Get started",
    ctaHref: "/signup",
    highlight: false,
    badge: null,
  },
  {
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
    cta: "Get started",
    ctaHref: "/signup",
    highlight: true,
    badge: "Best value",
  },
];

const CheckIcon = ({ included, highlight }: { included: boolean; highlight: boolean }) => (
  <div
    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
    style={{ background: included ? (highlight ? "#1e3a5f" : "#dbeafe") : "transparent" }}
  >
    {included ? (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2.5 2.5L8 3" stroke={highlight ? "#60a5fa" : "#3b82f6"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M3 3l4 4M7 3l-4 4" stroke="#cbd5e1" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    )}
  </div>
);

export default function PricingPage() {
  return (
    <main className="min-h-screen flex flex-col">

      {/* Header */}
      <section
        className="relative w-full px-6 pt-20 pb-48 overflow-hidden text-center"
        style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1c38 40%,#0d2247 100%)" }}
      >
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)", transform: "translate(-30%,-40%)" }} />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", transform: "translate(20%,-30%)" }} />
        <div className="relative z-10">
          <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">Pricing</p>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-4"
            style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
          >
            Simple pricing.
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Start free. Upgrade when you're ready to get serious.
          </p>
        </div>
      </section>

      {/* Cards — pulled up over the hero */}
      <section className="w-full px-6 pb-20" style={{ marginTop: "-140px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl"
                style={
                  plan.highlight
                    ? {
                        background: "#0f1c38",
                        border: "1px solid rgba(147,197,253,0.2)",
                        boxShadow: "0 24px 60px rgba(15,28,56,0.4), 0 0 0 1px rgba(147,197,253,0.1)",
                        paddingBottom: "2px",
                      }
                    : {
                        background: "#fff",
                        border: "1px solid #e8ecf2",
                        boxShadow: "0 4px 24px rgba(15,28,56,0.07)",
                      }
                }
              >
                {/* Best value badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{ background: "#3b82f6", color: "#fff", boxShadow: "0 2px 12px rgba(59,130,246,0.4)" }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1">
                  {/* Plan name */}
                  <p
                    className="text-[11px] font-bold tracking-widest uppercase mb-5"
                    style={{ color: plan.highlight ? "#60a5fa" : "#94a3b8" }}
                  >
                    {plan.name}
                  </p>

                  {/* Price */}
                  <div className="mb-1">
                    <span
                      className="font-black"
                      style={{
                        fontSize: "48px",
                        letterSpacing: "-0.03em",
                        color: plan.highlight ? "#fff" : "#0f1c38",
                        fontFamily: "'Sora', sans-serif",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: plan.highlight ? "#4d6a8a" : "#94a3b8" }}>
                    {plan.period}
                  </p>

                  {plan.highlight && (
                    <p className="text-xs font-semibold text-blue-400 mb-1">
                      Works out at £12.50/month
                    </p>
                  )}

                  <div
                    className="w-full h-px my-6"
                    style={{ background: plan.highlight ? "rgba(255,255,255,0.07)" : "#f1f5f9" }}
                  />

                  <p className="text-sm mb-6" style={{ color: plan.highlight ? "#4d6a8a" : "#64748b" }}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-center gap-3">
                        <CheckIcon included={f.included} highlight={plan.highlight} />
                        <span
                          className="text-sm"
                          style={{
                            color: f.included
                              ? plan.highlight ? "#c8d8ed" : "#1e293b"
                              : "#94a3b8",
                          }}
                        >
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plan.ctaHref}
                    className="w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all"
                    style={
                      plan.highlight
                        ? {
                            background: "#fff",
                            color: "#0f1c38",
                            fontFamily: "'Sora', sans-serif",
                            boxShadow: "0 4px 16px rgba(255,255,255,0.15)",
                          }
                        : {
                            background: "#f1f5f9",
                            color: "#0f1c38",
                          }
                    }
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-center text-slate-400 text-sm mt-8">
            Yearly plan saves you <span className="text-slate-600 font-semibold">£89.89</span> compared to monthly — that's over 4 months free.
          </p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="w-full bg-slate-50 border-t border-slate-100 px-6 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { color: "#3b82f6", bg: "#dbeafe", title: "Cancel any time", body: "No contracts, no funny business. Cancel your monthly plan whenever you like." },
            { color: "#16a34a", bg: "#dcfce7", title: "Instant access", body: "The moment you sign up, everything unlocks. No waiting, no setup." },
            { color: "#7c3aed", bg: "#ede9fe", title: "Built for results", body: "Every resource is designed around exam technique — not just content coverage." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 mb-1" style={{ fontFamily: "'Sora', sans-serif" }}>{item.title}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="w-full px-6 py-20 text-center"
        style={{ background: "linear-gradient(135deg,#0a1628 0%,#0f1c38 50%,#0d2247 100%)" }}
      >
        <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mb-3">Get started</p>
        <h2
          className="text-4xl font-black text-white mb-3 max-w-lg mx-auto"
          style={{ fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}
        >
          Ready to get your 9?
        </h2>
        <p className="text-slate-400 text-lg mb-10">Join students already using Maths with Madison to get ahead.</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-[15px] px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors"
            style={{ fontFamily: "'Sora', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
          >
            Start for free →
          </Link>
          <Link
            href="/meet-madison"
            className="inline-flex items-center text-blue-300 font-semibold text-[15px] px-6 py-3.5 rounded-xl hover:text-blue-200 transition-colors"
            style={{ border: "1px solid rgba(147,197,253,0.3)" }}
          >
            Meet Madison
          </Link>
        </div>
      </section>

    </main>
  );
}