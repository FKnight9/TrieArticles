class TrieNode {
    constructor (char) {
        this.char = char;
        this.pre = '';
        this.children = {};
        this.index = 0;
        this.isEnd = false;
        console.log("Constructor has run");
    }
}

module.exports = TrieNode;