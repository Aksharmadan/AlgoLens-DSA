'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-slate-200">

      {/* Background Glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-32 h-[480px] w-[480px] rounded-full bg-purple-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-pink-500/10 blur-3xl" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-32">

        {/* HERO */}
        <header className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Algo
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Lens
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            A visual playground to explore how{' '}
            <span className="text-slate-200 font-medium">real algorithms</span>{' '}
            power ranking, search, and trending systems used in modern platforms.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/search"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-white font-medium shadow-lg transition hover:scale-[1.03]"
            >
              Try Autocomplete
            </Link>

            <Link
              href="/rank"
              className="rounded-xl bg-slate-900/60 px-6 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Explore Ranking
            </Link>
          </div>
        </header>

        {/* FEATURES */}
        <section className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              title: 'Top-K Ranking',
              desc: 'Heap-based ranking without sorting entire datasets.',
              link: '/rank',
              cta: 'Learn how it works →',
            },
            {
              title: 'Autocomplete Search',
              desc: 'Real-time Trie-powered prefix suggestions.',
              link: '/search',
              cta: 'Try live search →',
            },
            {
              title: 'Trending Engine',
              desc: 'Frequency-based trend detection using sliding windows.',
              link: '/trending',
              cta: 'View trends →',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.link}
              className="group block rounded-2xl bg-slate-900/60 p-6 backdrop-blur transition
                         hover:-translate-y-1 hover:bg-slate-900 focus:outline-none"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-400">{item.desc}</p>
              <p className="mt-4 text-sm text-indigo-400 group-hover:underline">
                {item.cta}
              </p>
            </Link>
          ))}
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-32 grid grid-cols-1 gap-12 sm:grid-cols-3">
          <div>
            <h4 className="text-lg font-semibold">⚡ Real Data Structures</h4>
            <p className="mt-3 text-sm text-slate-400">
              No shortcuts. AlgoLens uses real implementations of Heaps, Tries, and Hash Maps.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">🧠 System Thinking</h4>
            <p className="mt-3 text-sm text-slate-400">
              Mirrors how platforms like Google, Twitter, and Netflix solve ranking and discovery.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">🎯 Built for Learning</h4>
            <p className="mt-3 text-sm text-slate-400">
              Every feature explains complexity, trade-offs, and real-world relevance.
            </p>
          </div>
        </section>

        {/* METRICS */}
        <section className="mt-24 rounded-2xl bg-slate-900/70 backdrop-blur p-10">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-slate-100">O(log N)</p>
              <p className="mt-1 text-sm text-slate-400">Heap Ranking</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-100">O(L)</p>
              <p className="mt-1 text-sm text-slate-400">Trie Prefix Search</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-slate-100">Real-Time</p>
              <p className="mt-1 text-sm text-slate-400">Trend Detection</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-32 text-center text-sm text-slate-500">
          Built with ❤️ to understand algorithms that power the real world.
        </footer>

      </div>
    </main>
  );
}
