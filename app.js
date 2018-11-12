const Trie = require("./trie");
const Article = require("./article");
const table = require("table").table;

let trie = new Trie();
let article = new Article();
article.checkTrie(trie);
let wordLength = article.getWordTotal(trie.companies);
trie.getRelevence(wordLength);
console.log(table(trie.frequencyTable));
console.log(table([["Total Words", wordLength]]));