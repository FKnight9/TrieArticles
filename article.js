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
                let inputArray = help.cleanInput(input).split(' ');
                Array.prototype.push.apply(this.text, inputArray);
            }
        }
    }

    isEnd(input) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] != '.') {
                return false;
            }
        }
        return true;
    }

    checkTrie(trie) {
        for (let i = 0; i < this.text.length; i++) {
            let j = i;
            let node = trie.root;
            let temp;
            let hits = [];
            do {
                temp = trie.find(node, this.text[j]);
                if (!temp) {
                    break;
                } else if (temp.children[' '] == undefined && temp.isEnd == true) {
                    hits.push(temp.index);
                    break;
                } else if (temp.children[' '] == undefined && temp.isEnd == false) {
                    break;
                } else if (temp.children[' '] != undefined && temp.isEnd == true) {
                    hits.push(temp.index);
                    j++;
                    node = temp.children[' '];
                } else if (temp.children[' '] != undefined && temp.isEnd == false) {
                    j++;
                    node = temp.children[' '];
                }
            } while (j < this.text.length);
            for (let k = 0; k < hits.length; k++) {
                trie.frequencyTable[hits[k] + 1][1]++;
            }
        }
    }
}

module.exports = Article;