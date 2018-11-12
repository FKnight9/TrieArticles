const TrieNode = require("./trieNode");
const help = require("./help");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
        this.companies = help.cleanInputFromFile('companies.dat');
        this.frequencyTable = [];
        this.frequencyTable.push(["Company", "Hit Count", "Relevance"]);
        for (let i = 0; i < this.companies.length; i++) {
            // Enter all the companies primary names into the
            // frequency table
            this.frequencyTable[i+1] = [];
            this.frequencyTable[i+1][0] = this.companies[i][0];
            this.frequencyTable[i+1][1] = 0;
            // Insert the company names into the Trie with the
            // same index to keep track of the company
            for (let j = 0; j < this.companies[i].length; j++) {
                let node = this.insert(this.companies[i][j]);
                node.index = i;
            }
        }
    }

    // Inserts word into trie starting from root node
    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in node.children)) {
                node.children[char] = new TrieNode(char);
                node.children[char].pre = node.pre + char;
            }
            if (i == word.length - 1) {
                node.children[char].isEnd = true;
            }
            node = node.children[char];
        }
        return node;
    }

    // Find the word in the trie given a starting node and a word
    find(node, word) {
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!(char in node.children)) {
                return node.children[char];
            }
            node = node.children[char];
        }
        return node;
    }

    // Given the amount of total words calculate the relevence of
    // each name using the frequency table
    getRelevence(total) {
        let totalHit = 0;
        for (let i = 1; i < this.frequencyTable.length; i++) {
            this.frequencyTable[i][2] = (this.frequencyTable[i][1] / total) * 100;
            totalHit += this.frequencyTable[i][1];
        }
        let totalRelevence = ((totalHit / total) * 100).toFixed(4);
        this.frequencyTable.push(["Total", totalHit, totalRelevence]);
    }
}

module.exports = Trie;