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

// More optimized method than part 1
const growFish = (fish, days) => {
  const newFish = new Array(9).fill(0); // Create an array with 9 values (days)
  newFish.forEach((_, i) => newFish[i] = fish.filter(val => val === i).length);

  for (let i = 0; i < days; i += 1) {
    const fishAtZero = newFish[0];

    newFish.shift(); // Remove a day from every fish
    newFish[6] += fishAtZero; // Every fish that was at 0 now go to 6
    newFish.push(fishAtZero); // Add a new fish at 8 for every fish that was at 0
  };

  return newFish.reduce((a, b) => a + b);
};


// Read file per line and get fish numbers and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '');
let fish = input.split(',').map(Number);


const result = growFish(fish, 256);

console.log('The final result is: ' + result);