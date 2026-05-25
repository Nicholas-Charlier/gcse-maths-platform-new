export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-xl font-bold tracking-tight text-slate-900">
            Maths with Madison
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#" className="hover:text-slate-950">Courses</a>
            <a href="#" className="hover:text-slate-950">Practice</a>
            <a href="#" className="hover:text-slate-950">Past Papers</a>
            <a href="#" className="hover:text-slate-950">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:block"
            >
              Log in
            </a>
            <a
              href="#"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Start learning
            </a>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950">
          Master GCSE maths with clear lessons and targeted practice.
        </h1>
      </section>
    </main>
  );
}