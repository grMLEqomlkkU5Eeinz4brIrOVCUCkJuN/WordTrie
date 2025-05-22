import { WordTrie } from './WordTrie';
import * as fs from 'fs/promises';

export class WordDictionary {
    private trie: WordTrie;
    private _loaded: boolean;

    constructor() {
        this.trie = new WordTrie();
        this._loaded = false;
    }

    get loaded(): boolean {
        return this._loaded;
    }

    async loadWordList(filePath: string): Promise<void> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const words = content.split('\n').map(word => word.trim().toLowerCase());
            
            for (const word of words) {
                if (word) {
                    this.trie.insert(word);
                }
            }
            
            this._loaded = true;
        } catch (error) {
            console.error('Error loading word list:', error);
            this._loaded = false;
        }
    }

    isValidWord(word: string): boolean {
        return this.trie.search(word);
    }

    getSuggestions(prefix: string, maxSuggestions: number = 10): string[] {
        return this.trie.getSuggestions(prefix, maxSuggestions);
    }

    validateWords(words: string[]): { [key: string]: boolean } {
        const results: { [key: string]: boolean } = {};
        for (const word of words) {
            results[word] = this.isValidWord(word);
        }
        return results;
    }
} 