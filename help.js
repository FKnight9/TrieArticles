const fs = require("fs");
const readline = require("readline-sync");

// Cleans the input from a given string, returns the string
function cleanInput (input) {
    input = input.replace(/[.,-\/#!$%\^&\@*;:{}=\-_`~()'"]/g, '');
    input = input.replace(/\s{1,}/g, ' ');
    return input;
}

// Cleans the input from a given file, returns a 2d array
function cleanInputFromFile(path) {
    let input = fs.readFileSync(path, 'utf-8');
    input = input.replace(/[.,\/#!$%\^&\@*;:{}=\-_`~()'"]/g, '');
    input = input.replace(/\r+/g, ''); 
    input = input.split(/\n+/g);

    let companies = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i].match(/\S+/g)) {
            let coName = input[i].split(/\t+/g);
            let companyNames = [];
            for (let j = 0; j < coName.length; j++) {
                if (coName[j].match(/\S+/g)) {
                    companyNames.push(coName[j]);
                }
            }
            companies.push(companyNames);
        }
    }
    return companies;

}

module.exports = {
    cleanInput,
    cleanInputFromFile
}