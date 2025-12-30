"use client";

import { useEffect, useState } from "react";

type Trend = {
  item: string;
  count: number;
};

// 🔥 HARD-CODED BACKEND URL (SAFE & WORKING)
const API_URL = "https://algolens-dsa.onrender.com";

export default function TrendingPage() {
  const [input, setInput] = useState("");
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchTrends() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/trending/top?k=5`);
      const data = await res.json();
      setTrends(Array.isArray(data.trends) ? data.trends : []);
    } catch (err) {
      console.error("fetchTrends failed", err);
      setTrends([]);
    } finally {
      setLoading(false);
    }
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
    } catch (err) {
      console.error("addEvent failed", err);
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

        <div className="mt-10 rounded-2xl bg-white p-6 shadow-xl flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEvent()}
            placeholder="Type event (e.g. apple)"
            className="flex-1 rounded-xl border px-4 py-3"
          />
          <button
            onClick={addEvent}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 font-semibold text-white"
          >
            Add
          </button>
        </div>

        <div className="mt-10">
          {loading && <p className="text-center text-slate-400">Updating…</p>}
          {!loading && trends.length === 0 && (
            <p className="text-center text-slate-400">
              No events yet. Start typing!
            </p>
          )}

          <ul className="mt-6 space-y-4">
            {trends.map((t, i) => (
              <li
                key={t.item}
                className="flex justify-between rounded-xl bg-white p-5 shadow"
              >
                <span className="font-semibold">
                  #{i + 1} {t.item}
                </span>
                <span className="font-bold text-orange-600">{t.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
