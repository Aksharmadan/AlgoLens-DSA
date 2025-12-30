"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    fetch(`http://localhost:4000/search?q=${q}`)
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(() => setResults([]));
  }, [q]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl rounded-2xl p-8 backdrop-blur-xl"
        style={{
          background: "var(--card-bg)",
          boxShadow: "0 0 60px rgba(99,102,241,0.25)",
          border: "1px solid var(--border-glow)"
        }}
      >
        <h1 className="text-3xl font-bold mb-1">Autocomplete Search</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Trie-powered real-time suggestions
        </p>

        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Type anything…"
          className="w-full px-4 py-3 rounded-xl bg-transparent border text-lg outline-none"
          style={{ borderColor: "var(--border-glow)" }}
        />

        <div className="grid grid-cols-3 gap-4 mt-5 text-center">
          <Stat label="Chars" value={q.length} />
          <Stat label="Results" value={results.length} />
          <Stat label="Time" value="O(L)" />
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border-glow)" }}
            >
              {results.map((r, i) => (
                <li
                  key={r}
                  onMouseEnter={() => setActive(i)}
                  className={`px-4 py-3 cursor-pointer ${
                    i === active
                      ? "bg-indigo-600/20"
                      : "hover:bg-indigo-600/10"
                  }`}
                >
                  {r}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="rounded-xl p-3 bg-white/5 border border-white/10">
      <div className="text-xs opacity-70">{label}</div>
      <div className="font-semibold text-lg">{value}</div>
    </div>
  );
}
