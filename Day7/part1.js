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
    fuel += Math.abs(crab - position);
  };

  return fuel;
};

const getMedianPosition = (crabs) => {
  const sortedCrabs = crabs.slice().sort((a, b) => a - b);

  if (sortedCrabs.length % 2 === 1) {
    // If total number of crabs is odd, we need to round the half of this total to the number above
    // However, since we use arrays, we can round it to the number below, by using the bitwise operator "~~"
    return sortedCrabs[~~(sortedCrabs.length / 2)];
  }

  const firstEven = sortedCrabs[sortedCrabs.length / 2];
  const secondEven = sortedCrabs[(sortedCrabs.length / 2) - 1];

  return (firstEven + secondEven) / 2;
};


// Read file per line and get positions and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '');
const crabs = input.split(',').map(Number);


const result = alignCrabsToPosition(crabs, getMedianPosition(crabs));

console.log('The final result is: ' + result);