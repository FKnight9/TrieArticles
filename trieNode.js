class TrieNode {
    constructor (char) {
        this.char = char;
        this.pre = '';
        this.children = {};
        this.index = 0;
        this.isEnd = false;
    }
}

module.exports = TrieNode;