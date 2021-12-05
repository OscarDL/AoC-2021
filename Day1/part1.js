const measurements = require('./measurements.json');


const getDepth = (measurements) => {
  let increasedDepth = 0;

  for (const index in measurements) {
    if (index > 0 && measurements[index] > measurements[index - 1]) {
      increasedDepth += 1;
    }
  }

  console.log(`The depth increased ${increasedDepth} times.`);
};


getDepth(measurements);
