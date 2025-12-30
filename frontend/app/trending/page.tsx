"use client";

import { useEffect, useState } from "react";

type Trend = {
  item: string;
  count: number;
};

// ✅ MUST start with NEXT_PUBLIC_
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
      console.error("Fetch trends failed", err);
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
      console.error("Add event failed", err);
    }
  }

  useEffect(() => {
    fetchTrends();
    const id = setInterval(fetchTrends, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-center">🔥 Live Trending</h1>

        <div className="mt-10 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEvent()}
            className="flex-1 border rounded-xl px-4 py-3"
            placeholder="Type event (apple)"
          />
          <button
            onClick={addEvent}
            className="px-6 py-3 rounded-xl bg-orange-500 text-white"
          >
            Add
          </button>
        </div>

        {loading && <p className="mt-6 text-center">Loading…</p>}

        <ul className="mt-6 space-y-3">
          {trends.map((t, i) => (
            <li key={t.item} className="flex justify-between bg-white p-4 rounded-xl shadow">
              <span>#{i + 1} {t.item}</span>
              <span>{t.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
