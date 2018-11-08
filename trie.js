const TrieNode = require("./trieNode");
const help = require("./help");

class Trie {
    constructor() {
        this.root = new TrieNode(null);
        let companies = help.cleanInputFromFile('companies.dat');
        this.createTrie(companies);
        this.frequencyTable = [];
        for (let i = 0; i < companies.length; i++) {
            // Enter all the companies primary names into the
            // frequency table
            this.frequencyTable[i] = [];
            this.frequencyTable[i][0] = companies[i][0];
            this.frequencyTable[i][1] = 0;
            // Insert the company names into the Trie with the
            // same index to keep track of the company
            for (let j = 0; j < companies[i].length; j++) {
                let node = this.insert(companies[i][j]);
                node.index = i;
            }
            console.log("Trie has run constructor");
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
            if (i === word.length - 1) {
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
            if (char in node.children) {
                node = node.children[char];
            } else {
                return null;
            }
        }
        return node;
    }

    // Given the amount of total words calculate the relevence of
    // each name using the frequency table
    getRelevence(total) {
        let totalHit = 0;
        for (let i = 0; i < this.frequencyTable.length; i++) {
            this.frequencyTable[i][2] = (this.frequencyTable[i][1] / total) * 100;
            totalHit += this.frequencyTable[i][1];
        }
        let totalRelevence = (totalHit / total) * 100;
        this.frequencyTable.push(["Total", totalHit, totalRelevence]);
        this.frequencyTable.push(["Total Words", total]);
    }
}

module.exports = Trie;