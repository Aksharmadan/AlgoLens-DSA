const express = require("express");
const router = express.Router();

const WINDOW_MS = 60 * 1000;
const events = [];

function cleanup(now) {
  while (events.length && events[0].time < now - WINDOW_MS) {
    events.shift();
  }
}

router.post("/add", (req, res) => {
  const { item } = req.body;

  if (!item || typeof item !== "string") {
    return res.status(400).json({ error: "Item required" });
  }

  events.push({
    item: item.toLowerCase(),
    time: Date.now(),
  });

  res.json({ message: "Event added" });
});

router.get("/top", (req, res) => {
  const k = Number(req.query.k || 5);
  const now = Date.now();

  cleanup(now);

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
    trends,
  });
});

module.exports = router;
