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

    getWordTotal() {
        let count = 0;
        for (let word in this.text) {
            if (this.isNotStopword(this.text[word])) {
                count++;
            } else {
                if(this.isCompanyName(word)) {
                    count++;        
                }
            }
        }
        return count;
    }

    isCompanyName(index) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (index >= this.map[i][j][0] && index <= this.map[i][j][1])
                    return true;
            }
        }
        return false;
    }

    isNotStopword(word) {
        if (word == "a") return false;
        if (word == "an") return false;
        if (word == "the") return false;
        if (word == "and") return false;
        if (word == "or") return false;
        if (word == "but") return false;
        if (word == "A") return false;
        if (word == "An") return false;
        if (word == "The") return false;
        if (word == "And") return false;
        if (word == "Or") return false;
        if (word == "But") return false;
        return true;
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
        this.map = new Array(trie.frequencyTable.length - 1);
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = [];
        }
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
                    this.map[temp.index].push([i,j]);
                    break;
                } else if (temp.children[' '] == undefined && temp.isEnd == false) {
                    break;
                } else if (temp.children[' '] != undefined && temp.isEnd == true) {
                    hits.push(temp.index);
                    this.map[temp.index].push([i,j]);
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