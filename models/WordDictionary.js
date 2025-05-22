const fs = require("fs");
const path = require("path");
const WordTrie = require("./WordTrie.js");
class WordDictionary {
	constructor() {
		this.trie = new WordTrie();
		this.loaded = false;
	}

	/**
	 * Load words from the ENABLE word list file
	 */
	async loadWordList(filePath = "/enable1.txt") {
		try {
			console.log("Loading word list...");
			const startTime = Date.now();

			const data = fs.readFileSync(filePath, "utf8");
			const words = data.split("\n").filter(word => word.trim().length > 0);

			console.log(`Found ${words.length} words. Building trie...`);

			for (const word of words) {
				this.trie.insert(word.trim());
			}

			const endTime = Date.now();
			console.log(`Trie built in ${endTime - startTime}ms`);
			console.log("Dictionary statistics:", this.trie.getStats());

			this.loaded = true;
		} catch (error) {
			console.error("Error loading word list:", error.message);
			console.log("Make sure enable1.txt is in the current directory");
			console.log("You can download it from: https://norvig.com/ngrams/enable1.txt");
		}
	}

	/**
	 * Check if a word is valid
	 */
	isValidWord(word) {
		if (!this.loaded) {
			console.log("Dictionary not loaded yet!");
			return false;
		}
		return this.trie.search(word);
	}

	/**
	 * Get word suggestions for autocomplete
	 */
	getSuggestions(prefix, maxSuggestions = 10) {
		if (!this.loaded) {
			console.log("Dictionary not loaded yet!");
			return [];
		}

		const suggestions = this.trie.getWordsWithPrefix(prefix);
		return suggestions.slice(0, maxSuggestions);
	}

	/**
	 * Batch lookup for multiple words
	 */
	validateWords(words) {
		if (!this.loaded) {
			console.log("Dictionary not loaded yet!");
			return {};
		}

		const results = {};
		const startTime = Date.now();

		for (const word of words) {
			results[word] = this.trie.search(word);
		}

		const endTime = Date.now();
		console.log(`Validated ${words.length} words in ${endTime - startTime}ms`);

		return results;
	}
}

module.exports = WordDictionary;