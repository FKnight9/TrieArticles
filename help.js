// Received following code from https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-22.php
function remove_character(str, char_pos) 
 {
  part1 = str.substring(0, char_pos);
  part2 = str.substring(char_pos + 1, str.length);
  return (part1 + part2);
 }
 // Done

// Cleans the input from a given string, returns the string
function cleanInput (input) {
    sLength = input.length;
    for (var i = 0; i < sLength; i++) {
        if ((input.charAt(i) >= 'A' && input.charAt(i) <= 'Z') || (input.charAt(i) >= 'a' && input.charAt(i) <= 'z'))
        {
            remove_character(input, i);
        }
      }
    return input;
}

// Cleans the input from a given file, returns a 2d array
function cleanInputFromFile(path) {
    comp = readFile('companies.dat', 'utf8', function(err, str) {
        if (err) {
            console.log(err);
        } 
        else {
            if (str === "" || typeof str !== "string") throw "companies.dat is empty"
        }

    cleanInput(comp)
    
    return array;
    
}

module.exports = {
    cleanInput,
    cleanInputFromFile
}