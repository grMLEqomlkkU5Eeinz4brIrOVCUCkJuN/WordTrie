
/**
 * Trie Node class for building the prefix tree
 */

/**
 * Trie data structure optimized for word lookup operations
 */

class TrieNode {
	constructor() {
		this.children = new Map();
		this.isEndOfWord = false;
	}
}

module.exports = TrieNode;