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


const isLowestAdjacentValue = (top, left, right, bottom, current) => {
  // .filter() is used to filter out undefined / NaN values from out of bounds board values
  const filteredValues = [top, left, right, bottom, current].filter(value => !isNaN(value));
  const lowest = Math.min(...filteredValues);

  // Only return true if the lowest value is the current one AND the only one in the array
  return lowest === current && filteredValues.filter(val => val === current).length === 1;
};

const getLowestPoints = (board) => {
  const lowestPoints = [];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const current = +board[i][j];

      const top = +board[i-1]?.[j];
      const left = +board[i]?.[j-1];
      const right = +board[i]?.[j+1];
      const bottom = +board[i+1]?.[j];

      if (isLowestAdjacentValue(top, left, right, bottom, current)) lowestPoints.push(+board[i][j] + 1);
    };
  };

  return lowestPoints;
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const board = input.map(line => line.split(''));

const result = getLowestPoints(board).reduce((a, b) => a + b);

console.log('The final result is: ' + result);