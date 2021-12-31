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


const getAdjacentOctopuses = (l, c) => {
  const coordinates = [
    [l, c-1], [l, c+1],
    [l-1, c], [l-1, c-1], [l-1, c+1],
    [l+1, c], [l+1, c-1], [l+1, c+1]
  ];

  // Filter out undefined (out of bounds) coordinates
  return coordinates.filter(coord => coord.every(val => val >= 0 && val < 10));
};

const flashOctopus = (flashes, board, l, c) => {
  flashes.push([l, c]);


  for (const coords of getAdjacentOctopuses(l, c)) {
    const octopus = board[coords[0]][coords[1]];

    if (!flashes.map(flash => flash.join()).includes(coords.join()) && octopus < 10 && octopus > 0) {
      board[coords[0]][coords[1]] += 1;

      if (board[coords[0]][coords[1]] > 9) {
        flashOctopus(flashes, board, coords[0], coords[1]);
      }
    }
  };


  board[l][c] = 0;
};

const solveOctopuses = (board, steps) => {
  for (let step = 0; step < steps; step += 1) {
    // Add 1 to each octopus before doing anything else
    board = board.map(line => line.map(val => val + 1));

    const flashes = [];

    for (let l = 0; l < board.length; l += 1) {
      for (let c = 0; c < board[0].length; c += 1) {
        if (board[l][c] > 9) {
          flashOctopus(flashes, board, l, c);
        }
      };
    };

    if (board.flat().every(val => val === 0)) return step + 1; // All octopuses are flashing
  };
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const board = input.map(line => line.split('').map(Number));


const result = solveOctopuses(board, Infinity);

console.log('The final result is: ' + result);