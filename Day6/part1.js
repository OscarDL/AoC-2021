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

const growFish = (fish, days) => {
  for (let i = 0; i < days; i += 1) {
    // Fish can be added before the second loop ends, so we save the length first
    const fishNb = fish.length;

    for (let j = 0; j < fishNb; j += 1) {
      if (fish[j] > 0) {
        fish[j] -= 1;
        continue;
      }

      fish[j] = 6; // Reset fish state to value 6
      fish.push(8); // Spawn new fish with value 8
    };
  };

  return fish.length;
};


// Read file per line and get fish numbers and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '');
let fish = input.split(',').map(Number);


const result = growFish(fish, 80);

console.log('The final result is: ' + result);