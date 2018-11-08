const Trie = require("./trie");
const TrieNode = require("./trieNode");
const help = require("./help");
const readline = require("readline-sync");

class Article {
    constructor() {
        this.text = [];
        this.map = [];
        while(true) {
            let input = readline.question("Input Article: ");
            if (this.isEnd(input)) {
                break;
            } else {
                this.text.push.apply(help.cleanInput(input).split(' '));
            }
        }
        console.log("Article constructor has ended");
    }

    isEnd(input) {
        for (let i = 0; i < input.length; i++) {
            if (text[i] != '.') {
                return false;
            }
        }
        return true;
    }

    checkTrie(trie) {
        this.map = new Array(trie.frequencyTable.length);
        for (let i = 0; i < this.map.length; i++) {
            this.map[i] = [];
        }
        for (let i = 0; i < this.text.length; i++) {
            let node = trie.root;
            let temp;
            let hits = [];
            do {
                temp = trie.find(node, this.text[j]);
                if (temp === null) {
                    break;
                } else if (temp.children[' '] == undefined && temp.isEnd == true) {
                    hits.push(temp.index);
                    break;
                } else if (temp.children[' '] == undefined && temp.isEnd == false) {
                    break;
                } else if (temp.children[' '] != undefined && temp.isEnd == true) {
                    hits.push(temp.index);
                    i++;
                } else if (temp.children[' '] != undefined && temp.isEnd == false) {
                    i++;
                    node = temp.children[''];
                }
            } while (j < this.text.length);
            for (let k = 0; k < hits.length; k++) {
                trie.frequencyTable[hits[k]][1]++;
            }
        }
    }
}

module.exports = Article;