const express = require("express");
const router = express.Router();
const trie = require("../engine/trieInstance");

router.get("/", (req, res) => {
  const q = (req.query.q || "").toLowerCase().trim();
  if (!q) return res.json([]);

  const results = trie.autocomplete(q, 6);
  res.json(results);
});

module.exports = router;
