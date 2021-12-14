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

const spliceOrReturnBoard = (boards, board, loopedNumbers) => {
  if (boards.length === 1) {
    return {
      losingBoard: boards[0],
      finalNumber: loopedNumbers.pop()
    };
  } else {
    boards.splice(boards.findIndex(b => b === board), 1);
    return null;
  }
};

const isArrayNegative = (array) => (
  array.filter(n => n >= 0).length === 0
);


const getLosingBoard = (lines, numbers) => {
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

        // Check if any line is negative and remove the board
        if (isArrayNegative(line)) {
          const returnedValue = spliceOrReturnBoard(boards, board, loopedNumbers);
          if (returnedValue) return returnedValue;
        }
      }

      // Check if any column is negative and remove the board
      let column = board.map(line => line[0]);
      if (isArrayNegative(column)) {
        const returnedValue = spliceOrReturnBoard(boards, board, loopedNumbers);
        if (returnedValue) return returnedValue;
      }
    }
  }
};


// Read file per line and get numbers to draw and remove line return
const lines = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const numbersToDraw = splitNumbers(lines[0], ',');

const { losingBoard, finalNumber } = getLosingBoard(lines, numbersToDraw);
const positiveNumbers = losingBoard.map(line => line.filter(n => n >= 0));

const result = positiveNumbers.flat().reduce((a, b) => a + b, 0) * finalNumber;

const foundLosingBoard = losingBoard.map(line => line.map(Math.abs));
const boardNumber = getNewBoards().findIndex(board => String(board) === String(foundLosingBoard)) + 1;

console.log('The final result is: ' + result);
console.log('The losing board is: ' + boardNumber);