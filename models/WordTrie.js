const TrieNode = require("./TrieNode.js");

/**
 * Word Dictionary class that manages the ENABLE word list
 */
class WordTrie {
	constructor() {
		this.root = new TrieNode();
		this.wordCount = 0;
	}

	/**
	 * Insert a word into the trie
	 * Time complexity: O(m) where m is word length
	 */
	insert(word) {
		let current = this.root;

		for (const char of word.toLowerCase()) {
			if (!current.children.has(char)) {
				current.children.set(char, new TrieNode());
			}
			current = current.children.get(char);
		}

		if (!current.isEndOfWord) {
			current.isEndOfWord = true;
			this.wordCount++;
		}
	}

	/**
	 * Search for a word in the trie
	 * Time complexity: O(m) where m is word length
	 */
	search(word) {
		let current = this.root;

		for (const char of word.toLowerCase()) {
			if (!current.children.has(char)) {
				return false;
			}
			current = current.children.get(char);
		}

		return current.isEndOfWord;
	}

	/**
	 * Check if any word starts with the given prefix
	 * Time complexity: O(m) where m is prefix length
	 */
	startsWith(prefix) {
		let current = this.root;

		for (const char of prefix.toLowerCase()) {
			if (!current.children.has(char)) {
				return false;
			}
			current = current.children.get(char);
		}

		return true;
	}

	/**
	 * Get all words that start with the given prefix
	 * Useful for autocomplete functionality
	 */
	getWordsWithPrefix(prefix) {
		const words = [];
		let current = this.root;

		// Navigate to the prefix node
		for (const char of prefix.toLowerCase()) {
			if (!current.children.has(char)) {
				return words; // No words with this prefix
			}
			current = current.children.get(char);
		}

		// DFS to collect all words from this point
		this._collectWords(current, prefix.toLowerCase(), words);
		return words;
	}

	/**
	 * Helper method for collecting words via DFS
	 */
	_collectWords(node, currentWord, words) {
		if (node.isEndOfWord) {
			words.push(currentWord);
		}

		for (const [char, childNode] of node.children) {
			this._collectWords(childNode, currentWord + char, words);
		}
	}

	/**
	 * Get statistics about the trie
	 */
	getStats() {
		return {
			wordCount: this.wordCount,
			nodeCount: this._countNodes(this.root),
			maxDepth: this._getMaxDepth(this.root, 0)
		};
	}

	_countNodes(node) {
		let count = 1;
		for (const child of node.children.values()) {
			count += this._countNodes(child);
		}
		return count;
	}

	_getMaxDepth(node, currentDepth) {
		let maxDepth = currentDepth;
		for (const child of node.children.values()) {
			maxDepth = Math.max(maxDepth, this._getMaxDepth(child, currentDepth + 1));
		}
		return maxDepth;
	}
}

module.exports = WordTrie;