class TrieNode {
  constructor() {
    this.children = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.end = true;
  }

  autocomplete(prefix, limit = 6) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }

    const results = [];
    this._dfs(node, prefix, results, limit);
    return results;
  }

  _dfs(node, word, results, limit) {
    if (results.length >= limit) return;
    if (node.end) results.push(word);

    for (const ch in node.children) {
      this._dfs(node.children[ch], word + ch, results, limit);
    }
  }
}

module.exports = Trie;
