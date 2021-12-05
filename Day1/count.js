const measurements = require('./measurements.json');


const part1 = (measurements) => {
  let increasedDepth = 0;

  for (const index in measurements) {
    if (index > 0 && measurements[index] > measurements[index - 1]) {
      increasedDepth += 1;
    }
  }

  console.log(`The depth increased ${increasedDepth} times.`);
};


const part2 = (measurements) => {
  let increasedDepth = 0;

  for (const index in measurements) {
    // Start at the 4th index
    if (index > 2) {
      const firstThree = measurements[index - 1] + measurements[index - 2] + measurements[index - 3];
      const secondThree = measurements[index] + measurements[index - 1] + measurements[index - 2];

      if (secondThree > firstThree) {
        increasedDepth += 1;
      }
    }
  }

  console.log(`The three-depth increased ${increasedDepth} times.`);
};


part1(measurements);
part2(measurements);
