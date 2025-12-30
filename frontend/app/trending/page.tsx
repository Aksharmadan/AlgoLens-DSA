const express = require("express");
const router = express.Router();

// 🔥 GLOBAL STATE (do NOT put inside route)
let events = [];

// CLEAN old events (60s window)
function cleanup() {
  const now = Date.now();
  events = events.filter(e => now - e.time <= 60_000);
}

// ADD EVENT
router.post("/add", (req, res) => {
  const { item } = req.body;
  if (!item) return res.sendStatus(400);

  events.push({ item: item.toLowerCase(), time: Date.now() });
  cleanup();

  res.json({ ok: true });
});

// GET TOP TRENDS
router.get("/top", (req, res) => {
  cleanup();

  const k = Number(req.query.k || 5);
  const freq = {};

  for (const e of events) {
    freq[e.item] = (freq[e.item] || 0) + 1;
  }

  const trends = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([item, count]) => ({ item, count }));

  res.json({ trends });
});

module.exports = router;
