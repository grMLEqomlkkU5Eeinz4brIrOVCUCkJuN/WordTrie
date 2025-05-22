# Word Trie

A fast and efficient word dictionary implementation using a Trie data structure. This package provides a robust solution for word lookups, spell checking, and autocomplete functionality.

## Installation

```bash
npm install word-trie
```

## Features

- Fast word lookups
- Autocomplete suggestions
- Batch word validation
- Case-insensitive operations
- TypeScript support

## Usage

```typescript
import { WordDictionary } from 'word-trie';

// Create a new dictionary instance
const dictionary = new WordDictionary();

// Load a word list (optional)
await dictionary.loadWordList('./path/to/wordlist.txt');

// Check if a word is valid
const isValid = dictionary.isValidWord('hello');
console.log(isValid); // true

// Get autocomplete suggestions
const suggestions = dictionary.getSuggestions('prog', 5);
console.log(suggestions); // ['program', 'programming', 'progress', ...]

// Validate multiple words at once
const results = dictionary.validateWords(['hello', 'world', 'invalid']);
console.log(results);
// {
//   'hello': true,
//   'world': true,
//   'invalid': false
// }
```

## API Reference

### WordDictionary

#### `constructor()`
Creates a new WordDictionary instance.

#### `async loadWordList(filePath: string): Promise<void>`
Loads words from a text file into the dictionary.

#### `isValidWord(word: string): boolean`
Checks if a word exists in the dictionary.

#### `getSuggestions(prefix: string, maxSuggestions: number = 10): string[]`
Returns an array of word suggestions starting with the given prefix.

#### `validateWords(words: string[]): { [key: string]: boolean }`
Validates multiple words and returns an object with the results.

## License

MIT
