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

  for (let l = 0; l < board.length; l += 1) {
    for (let c = 0; c < board[l].length; c += 1) {
      const current = +board[l][c];

      const top = +board[l-1]?.[c];
      const left = +board[l]?.[c-1];
      const right = +board[l]?.[c+1];
      const bottom = +board[l+1]?.[c];

      // Unlike part 1, push the coordinates into the array instead of pushing the board value
      if (isLowestAdjacentValue(top, left, right, bottom, current)) lowestPoints.push([l, c]);
    };
  };

  return lowestPoints;
};

// Returns adjacent values smaller than 9
const getValidAdjacentValues = (board, [l, c]) => {
  const result = [];

  if (board[l-1]?.[c] < 9) { // top
    result.push([l-1, c]);
  }

  if (board[l]?.[c-1] < 9) { // left
    result.push([l, c-1]);
  }

  if (board[l]?.[c+1] < 9) { // right
    result.push([l, c+1]);
  }

  if (board[l+1]?.[c] < 9) { // bottom
    result.push([l+1, c]);
  }

  return result;
};

const getBasinValues = (board) => {
  let turns;
  const basins = [];

  for (const coordinate of getLowestPoints(board)) {
    const [l, c] = coordinate;
    turns = [[l, c]]; // initial array of coordinates
    
    const newBasin = [];

    // while there is a coordinate entry lower than 9 on the board
    while (turns.length > 0) {

      // Only push the value once to the basin in case we find
      // the same adjacent value from multiple coordinates
      if (!newBasin.find(val => val.join() === turns[0].join())) {
        newBasin.push(turns[0]);

        getValidAdjacentValues(board, turns[0]).forEach(value => {
          // Only push the value once to the coordinate entries
          if (!turns.find(turn => turn.join() === value.join())) {
            turns.push(value);
          }
        });
      }

      turns.shift();
    };

    basins.push(newBasin);
  }

  return basins.map(basin => basin.length);
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const board = input.map(line => line.split(''));


const result = [];
const basins = getBasinValues(board).sort((a, b) => a - b).reverse();

for (const basin of basins) {
  result.push(basin);
  if (result.length === 3) break;
}

console.log('The final result is: ' + result.reduce((a, b) => a * b));