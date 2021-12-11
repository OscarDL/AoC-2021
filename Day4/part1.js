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

const getNewBoards = () => {
  const boards = [];

  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i] === '') {
      boards.push([
        splitNumbers(lines[i+1], / +/),
        splitNumbers(lines[i+2], / +/),
        splitNumbers(lines[i+3], / +/),
        splitNumbers(lines[i+4], / +/),
        splitNumbers(lines[i+5], / +/)
      ]);
    }
  }

  return boards;
};


const splitNumbers = (string, pattern) => (
  // filter removes empty string space as first character
  string.split(pattern).filter(n => n !== '').map(Number)
);

const isArrayNegative = (array) => (
  array.filter(n => n >= 0).length === 0
);


const getWinningBoard = (lines, numbers) => {
  let loopedNumbers = [];
  const boards = getNewBoards();

  for (let i = 0; i < lines.length; i += 1) {
    loopedNumbers.push(numbers[i]);

    // Loop through all boards
    for (const board of boards) {

      // Loop through all lines
      for (const line of board) {
        // Turn the matched numbers into their negative equivalent
        line.forEach((number, i) => {
          if (loopedNumbers.includes(number)) {
            line[i] = number * -1;
          }
        });

        // Check if any line is negative to find the winning board
        if (isArrayNegative(line)) {
          return {
            boards,
            winningBoard: board,
            finalNumber: loopedNumbers.pop()
          };
        }
      }

      // Check if any column is negative to find the winning board
      let column = board.map(line => line[0]);
      if (isArrayNegative(column)) {
        return {
          boards,
          winningBoard: board,
          finalNumber: loopedNumbers.pop()
        };
      }
    }
  }
};


// Read file per line and get numbers to draw
const lines = readFile('input.txt').split('\n');
const numbersToDraw = splitNumbers(lines[0], ',');

const { boards, winningBoard, finalNumber } = getWinningBoard(lines, numbersToDraw);

// concatenating arrays to an empty array merges them all into a single one
const positiveNumbers = [].concat(...winningBoard.map(line => line.filter(n => n >= 0)));

const result = positiveNumbers.reduce((a, b) => a + b, 0) * finalNumber;
const boardNumber = boards.findIndex(board => board === winningBoard) + 1;

console.log('The final result is: ' + result);
console.log('The winning board is: ' + boardNumber);