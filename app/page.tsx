import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-32 px-6">
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 text-center max-w-3xl leading-tight">
        Get Ahead. Get a 9.{" "}
        <span className="text-blue-300">GCSE & IGCSE Maths.</span>
      </h1>
      <p className="mt-6 text-center text-lg text-gray-500 max-w-xl leading-relaxed">
        The complete maths programme designed by an expert tutor to get you ahead of the competition.
      </p>
      <Link
        href="/signup"
        className="mt-10 rounded-full bg-blue-300 px-8 py-3 text-white font-semibold text-lg hover:bg-blue-400 transition-colors"
      >
        Learn with us
      </Link>
    </main>
  );
}