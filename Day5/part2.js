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

const getNewBoard = (lines, columns) => {
  const board = [];

  for (let i = 0; i <= lines; i += 1) {
    board[i] = [];

    for (let j = 0; j <= columns; j+= 1) {
      board[i][j] = 0;
    }
  }

  return board;
};


// Read file per line and get numbers to draw and remove line return
const lines = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const vents = lines.map(line => line.split(' -> '));

// Get the total number of lines and columns
const max_lines = Math.max(...vents.flat().map(num => +num.split(',')[1]));
const max_columns = Math.max(...vents.flat().map(num => +num.split(',')[0]));

// Create a new board as an array (lines) of arrays (columns)
const board = getNewBoard(max_lines, max_columns);


for (const vent of vents) {
  let [[x1, y1], [x2, y2]] = vent.map(xy => xy.split(',').map(Number));

  // Vertical
  if (x1 === x2) {
    // Put numbers in ascending order
    if (y1 > y2) [y1, y2] = [y2, y1];
  
    // Add 1 to the values from line y1 to line y2 at column x1
    for (let i = y1; i <= y2; i += 1) {
      board[x1][i] += 1;
    }
  }

  // Vertical
  if (y1 === y2) {
    // Put numbers in ascending order
    if (x1 > x2) [x1, x2] = [x2, x1];
  
    // Add 1 to the values from column x1 to column x2 at line y1
    for (let i = x1; i <= x2; i += 1) {
      board[i][y1] += 1;
    }
  }

  // Diagonal symmetrical top left <-> bottom right
  if (x1 - y1 === x2 - y2) {
    // Add 1 to the values from line x1 & column x2 to line y1 & column y2

    if (x1 < x2) {
      for (let i = x1; i <= x2; i += 1) {
        board[i][y1 + (i - x1)] += 1;
      }
    } else {
      for (let i = x1; i >= x2; i -= 1) {
        board[i][y1 + (i - x1)] += 1;
      }
    }
  }

  // Diagonal symmetrical top right <-> bottom left
  if (x1 + y1 === x2 + y2) {
    // Add 1 to the values from line x1 & column x2 to line y1 & column y2
    if (x1 < x2) {
      for (let i = x1; i <= x2; i += 1) {
        board[i][y1 - (i - x1)] += 1;
      }
    } else {
      for (let i = x1; i >= x2; i -= 1) {
        board[i][y1 - (i - x1)] += 1;
      }
    }
  }
};


const result = board.flat().filter(num => num > 1).length;

console.log('The final result is: ' + result);