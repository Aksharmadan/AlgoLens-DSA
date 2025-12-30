"use client";

import { useEffect, useState } from "react";

type Trend = {
  item: string;
  count: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

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
    } catch {
      setTrends([]);
    } finally {
      setLoading(false);
    }
  }

  async function addEvent() {
    if (!input.trim()) return;

    await fetch(`${API_URL}/trending/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: input.trim() }),
    });

    setInput("");
    fetchTrends();
  }

  useEffect(() => {
    fetchTrends();
    const id = setInterval(fetchTrends, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center">🔥 Live Trending</h1>

        <div className="mt-10 bg-white p-6 rounded-xl shadow">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addEvent()}
              className="flex-1 border rounded-lg px-4 py-3"
              placeholder="Type event"
            />
            <button
              onClick={addEvent}
              className="px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold"
            >
              Add
            </button>
          </div>
        </div>

        <ul className="mt-8 space-y-4">
          {trends.map((t, i) => (
            <li key={t.item} className="flex justify-between bg-white p-4 rounded shadow">
              <span>#{i + 1} {t.item}</span>
              <span>{t.count}</span>
            </li>
          ))}
        </ul>

        {!loading && trends.length === 0 && (
          <p className="text-center mt-6 text-gray-400">No events yet</p>
        )}
      </div>
    </main>
  );
}
