const fs = require('fs');


const readFile = (file) => {
  try {
    var data = fs.readFileSync(file, 'utf8');
    return data.toString();
  }

  catch (e) {
    console.log(e.stack);
  }
};

const getSyntaxErrors = (lines) => {
  const totalErrors = {
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0
  };

  for (const line of lines) {
    const expectedClosingChars = [];

    for (let i = 0; i < line.length; i += 1) {
      if (['(', '[', '{', '<'].includes(line[i])) {
        expectedClosingChars.unshift(match_closing[line[i]]);
      }

      else {
        if (expectedClosingChars[0] !== line[i]) {
          totalErrors[line[i]] += 1;
          break;
        }

        else expectedClosingChars.shift();
      }
    };
  };

  return totalErrors;
};

const countTotalErrors = (char, occurence) => {
  switch (char) {
    case ')': return 3 * occurence;

    case ']': return 57 * occurence;

    case '}': return 1197 * occurence;

    case '>': return 25137 * occurence;
  };
};


const match_closing = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const lines = input.map(line => line.split(''));


const errors = getSyntaxErrors(lines);
const result = Object.keys(errors).map(char => countTotalErrors(char, errors[char]));

console.log('The final result is: ' + result.reduce((a, b) => a + b));