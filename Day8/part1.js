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

const match_segment = {
  2: 1,
  3: 7,
  4: 4,
  5: [2, 3, 5],
  6: [6, 9],
  7: 8
};


// Read file per line and get segment strings and remove line return
const input = readFile('input.txt').replace(/[\r]/g, '').split('\n');
const segments = input.map(line => line.split(' | ')[1]);


let total = 0;

for (const segment of segments) {
  for (const signal of segment.split(' ')) {
    // Get the type of pattern from the signal
    const matched = match_segment[signal.length];

    // Only focus on the easy segments
    if (typeof matched !== 'number') {
      continue;
    }

    total += 1;
  }
};


console.log('The final result is: ' + total);