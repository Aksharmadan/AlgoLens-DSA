const express = require("express");
const MaxHeap = require("../engine/heap");

const router = express.Router();

router.post("/top-k", (req, res) => {
  const { data, k } = req.body;
  if (!Array.isArray(data) || k <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const heap = new MaxHeap();
  data.forEach(n => heap.push(n));

  const result = [];
  for (let i = 0; i < k && heap.heap.length; i++) {
    result.push(heap.pop());
  }

  res.json({ topK: result });
});

module.exports = router;
