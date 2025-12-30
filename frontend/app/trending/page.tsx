"use client";

import { useEffect, useState } from "react";

type Trend = {
  item: string;
  count: number;
};

const API_URL = process.env.https://algolens-dsa.onrender.com;

export default function TrendingPage() {
  const [input, setInput] = useState("");
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTrends() {
    const controller = new AbortController();
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/trending/top?k=5`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setTrends(Array.isArray(data.trends) ? data.trends : []);
    } catch {
      setTrends([]);
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }

  async function addEvent() {
    if (!input.trim()) return;

    try {
      await fetch(`${API_URL}/trending/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: input.trim() }),
      });

      setInput("");
      fetchTrends();
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    fetchTrends();
    const interval = setInterval(fetchTrends, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center text-slate-900">
          🔥 Live Trending
        </h1>
        <p className="mt-3 text-center text-slate-600">
          Trending events in the <b>last 60 seconds</b>
        </p>

        {/* Input */}
        <div className="mt-10 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEvent()}
              placeholder="Type event (e.g. apple)"
              className="flex-1 rounded-xl border px-4 py-3
                text-slate-900 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
            <button
              onClick={addEvent}
              className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500
                px-6 py-3 font-semibold text-white shadow hover:scale-105 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Trends */}
        <div className="mt-10">
          {loading && (
            <p className="text-center text-slate-400">Updating trends…</p>
          )}

          {!loading && trends.length === 0 && (
            <p className="text-center text-slate-400">
              No events yet. Start typing!
            </p>
          )}

          <ul className="mt-6 space-y-4">
            {trends.map((t, i) => (
              <li
                key={t.item}
                className="flex items-center justify-between rounded-xl
                  bg-white p-5 shadow"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-orange-500">
                    #{i + 1}
                  </span>
                  <span className="text-lg font-semibold text-slate-800">
                    {t.item}
                  </span>
                </div>
                <span className="rounded-full bg-orange-100 px-4 py-1
                  font-semibold text-orange-700">
                  {t.count}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center text-sm">
          <Info title="Window">60 seconds</Info>
          <Info title="Refresh">2s live</Info>
          <Info title="Method">Sliding window</Info>
        </div>
      </div>
    </main>
  );
}

function Info({ title, children }: { title: string; children: any }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="font-semibold text-slate-700">{title}</div>
      <div className="mt-1 text-orange-600 font-medium">{children}</div>
    </div>
  );
}
