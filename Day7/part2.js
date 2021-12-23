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


const alignCrabsToPosition = (crabs, position) => {
  let fuel = 0;

  for (const crab of crabs) {
    const distance = Math.abs(crab - position);
    fuel += (distance * (distance + 1)) / 2;
  };

  return fuel;
};

const getPreferredPosition = (crabs) => {
  const triedPositions = [];
  const maxRounds = Math.max(...crabs);

  // Get the fuel cost of each position input
  for (let i = 0; i <= maxRounds; i += 1) {
    triedPositions.push(alignCrabsToPosition(crabs, i));
  };

  // Return the smallest fuel-costly position
  return Math.min(...triedPositions);
};


// Read file per line and get positions and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '');
const crabs = input.split(',').map(Number);


const result = getPreferredPosition(crabs);

console.log('The final result is: ' + result);