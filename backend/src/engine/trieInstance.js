const fs = require("fs");
const path = require("path");
const Trie = require("./trie");

const trie = new Trie();

const WORDS_PATH = path.join(__dirname, "../../words.txt");
const words = fs.readFileSync(WORDS_PATH, "utf-8").split(/\r?\n/);

for (const word of words) {
  const w = word.trim().toLowerCase();
  if (w) trie.insert(w);
}

console.log(`✅ Trie loaded with ${words.length} words`);

module.exports = trie;
