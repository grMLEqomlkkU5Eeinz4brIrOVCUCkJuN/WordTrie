const WordTrie = require("./models/WordTrie.js");
const TrieNode = require("./models/TrieNode.js");
const WordDictionary = require("./models/WordDictionary.js");

async function demo() {
	const dictionary = new WordDictionary();

	// Load the word list (you"ll need to download enable1.txt)
	await dictionary.loadWordList("./enable1.txt");

	if (!dictionary.loaded) {
		return;
	}

	console.log("\n=== Word Lookup Demo ===");

	// Test individual word lookups
	const testWords = ["hello", "world", "javascript", "nodejs", "xyz123"];
	console.log("\nTesting individual words:");
	for (const word of testWords) {
		const isValid = dictionary.isValidWord(word);
		console.log(`"${word}": ${isValid ? "VALID" : "INVALID"}`);
	}

	// Test autocomplete
	console.log("\nAutocomplete for prog:");
	const suggestions = dictionary.getSuggestions("prog", 5);
	console.log(suggestions);

	// Performance test
	console.log("\n=== Performance Test ===");
	const randomWords = ["apple", "banana", "computer", "dictionary", "elephant"];
	const startTime = Date.now();

	for (let i = 0; i < 10000; i++) {
		const randomWord = randomWords[i % randomWords.length];
		dictionary.isValidWord(randomWord);
	}

	const endTime = Date.now();
	console.log(`10,000 lookups completed in ${endTime - startTime}ms`);
	console.log(`Average: ${((endTime - startTime) / 10000).toFixed(4)}ms per lookup`);

	// Batch validation
	console.log("\nBatch validation:");
	const wordsToValidate = ["hello", "world", "invalid", "computer", "xyz"];
	const results = dictionary.validateWords(wordsToValidate);
	console.log(results);
}

// Run demo if this file is executed directly
if (require.main === module) {
	demo().catch(console.error);
}