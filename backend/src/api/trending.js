const express = require("express");
const router = express.Router();

const WINDOW = 60 * 1000;
let events = [];

router.post("/add", (req, res) => {
  const { item } = req.body;
  if (!item) return res.status(400).json({ error: "item required" });

  events.push({ item, time: Date.now() });
  res.json({ success: true });
});

router.get("/top", (req, res) => {
  const k = Number(req.query.k) || 5;
  const now = Date.now();

  events = events.filter(e => now - e.time <= WINDOW);

  const freq = {};
  for (const e of events) {
    freq[e.item] = (freq[e.item] || 0) + 1;
  }

  const trends = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([item, count]) => ({ item, count }));

  res.json({
    window: "last 60 seconds",
    totalEvents: events.length,
    trends
  });
});

module.exports = router;
