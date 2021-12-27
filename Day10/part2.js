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

// Reusing part 1's work
const match_closing = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
};

const getIncompleteLines = (lines) => {
  const newLines = JSON.parse(JSON.stringify(lines)); // Deep copy

  for (const line of lines) {
    const expectedClosingChars = [];

    for (let i = 0; i < line.length; i += 1) {
      if (['(', '[', '{', '<'].includes(line[i])) {
        expectedClosingChars.unshift(match_closing[line[i]]);
      }

      else {
        if (expectedClosingChars[0] !== line[i]) {
          const lineIndex = newLines.findIndex(l => l.join() === line.join());
          // Remove corrupted lines and only keep incomplete ones
          newLines.splice(lineIndex, 1);
          break;
        }

        else expectedClosingChars.shift();
      }
    };
  };

  return newLines;
};

const getLineScore = (chars) => {
  let total = 0;

  for (const char of chars) {
    total *= 5;

    if (char === ')') total += 1;
    if (char === ']') total += 2;
    if (char === '}') total += 3;
    if (char === '>') total += 4;
  };

  return total;
};

// Part 2
const getCompleteScore = (lines) => {
  // Initialize score
  const score = [];

  for (const line of lines) {
    const expectedClosingChars = [];

    for (let i = 0; i < line.length; i += 1) {
      if (['(', '[', '{', '<'].includes(line[i])) {
        expectedClosingChars.unshift(match_closing[line[i]]);
      }

      else {
        expectedClosingChars.shift();
      }
    };

    score.push(getLineScore(expectedClosingChars));
  };

  return score;
};

const getMedianScore = (scores) => {
  const sortedScores = scores.sort((a, b) => a - b);

  if (sortedScores.length % 2 === 1) {
    // If total number of crabs is odd, we need to round the half of this total to the number above
    // However, since we use arrays, we can round it to the number below, by using the bitwise operator "~~"
    return sortedScores[~~(sortedScores.length / 2)];
  }

  const firstEven = sortedScores[sortedScores.length / 2];
  const secondEven = sortedScores[(sortedScores.length / 2) - 1];

  return (firstEven + secondEven) / 2;
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const lines = input.map(line => line.split(''));


const incompleteLines = getIncompleteLines(lines);console.log(incompleteLines.length)
const completeScore = getCompleteScore(incompleteLines);

console.log('The final result is: ' + getMedianScore(completeScore));