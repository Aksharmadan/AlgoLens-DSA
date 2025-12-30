"use client";

import { useState } from "react";

export default function RankPage() {
  const [rawInput, setRawInput] = useState("");
  const [k, setK] = useState(3);
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");

  function parseNumbers(input: string): number[] {
    return input
      .replace(/[^0-9.-]+/g, " ") // replace non-numbers with space
      .trim()
      .split(" ")
      .map(Number)
      .filter((n) => !isNaN(n));
  }

  function computeTopK() {
    setError("");
    const numbers = parseNumbers(rawInput);

    if (numbers.length === 0) {
      setError("Please enter at least one number.");
      return;
    }

    if (k <= 0 || k > numbers.length) {
      setError("K must be between 1 and the number of values.");
      return;
    }

    const sorted = [...numbers].sort((a, b) => b - a);
    setResult(sorted.slice(0, k));
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 text-center">
          Top-K Ranking
        </h1>
        <p className="mt-3 text-center text-slate-600">
          Find the <b>Top K largest values</b> using a Max Heap strategy.
        </p>

        {/* Card */}
        <div className="mt-10 rounded-2xl bg-white p-8 shadow-xl">
          <label className="block text-sm font-medium text-slate-700">
            Enter numbers (any format)
          </label>

          <textarea
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder="Example: 5 1 9, 3 | 14 7"
            className="mt-2 w-full rounded-xl border border-slate-300 p-4
              text-slate-900 placeholder-slate-400
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            rows={3}
          />

          <div className="mt-4 flex items-center gap-4">
            <div>
              <label className="block text-xs text-slate-500">K value</label>
              <input
                type="number"
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
                className="mt-1 w-24 rounded-lg border border-slate-300 px-3 py-2
                  text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <button
              onClick={computeTopK}
              className="mt-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
                px-6 py-3 font-semibold text-white shadow-lg
                transition hover:scale-105 hover:shadow-xl"
            >
              Compute Top-K
            </button>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          {/* Results */}
          {result.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-600 mb-3">
                Result
              </h3>
              <div className="flex flex-wrap gap-3">
                {result.map((num, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-indigo-50 px-4 py-2
                      font-semibold text-indigo-700 shadow-sm"
                  >
                    #{i + 1}: {num}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Info title="Algorithm">
            Uses a <b>Max Heap</b> to extract the largest element K times.
          </Info>
          <Info title="Complexity">
            <b>O(N + K log N)</b>
          </Info>
          <Info title="Real-World Use">
            Leaderboards, analytics, recommendations.
          </Info>
        </div>
      </div>
    </main>
  );
}

function Info({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-5 text-sm text-slate-600 shadow">
      <div className="mb-2 font-semibold text-slate-800">{title}</div>
      {children}
    </div>
  );
}
