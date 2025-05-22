import { TrieNode } from './TrieNode';

export class WordTrie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let current = this.root;
        for (const char of word.toLowerCase()) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        const node = this.findNode(word.toLowerCase());
        return node !== null && node.isEndOfWord;
    }

    startsWith(prefix: string): boolean {
        return this.findNode(prefix.toLowerCase()) !== null;
    }

    private findNode(word: string): TrieNode | null {
        let current = this.root;
        for (const char of word) {
            if (!current.children.has(char)) {
                return null;
            }
            current = current.children.get(char)!;
        }
        return current;
    }

    getSuggestions(prefix: string, maxSuggestions: number = 10): string[] {
        const suggestions: string[] = [];
        const node = this.findNode(prefix.toLowerCase());
        
        if (node) {
            this.collectWords(node, prefix.toLowerCase(), suggestions, maxSuggestions);
        }
        
        return suggestions;
    }

    private collectWords(
        node: TrieNode,
        prefix: string,
        suggestions: string[],
        maxSuggestions: number
    ): void {
        if (suggestions.length >= maxSuggestions) {
            return;
        }

        if (node.isEndOfWord) {
            suggestions.push(prefix);
        }

        for (const [char, childNode] of node.children) {
            this.collectWords(childNode, prefix + char, suggestions, maxSuggestions);
        }
    }
} 