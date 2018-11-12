const Trie = require("./trie");
const Article = require("./article");
const table = require("table").table;

let trie = new Trie();
let article = new Article();
article.checkTrie(trie);
trie.getRelevence(article.text.length);
console.log(table(trie.frequencyTable));
console.log(table([["Total Words", article.text.length]]));