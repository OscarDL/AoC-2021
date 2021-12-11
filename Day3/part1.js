const binaries = require('./binaries.json');


// Most used bit
const getGammaRate = (ones, zeroes) => ones > zeroes;

// Least used bit
const getEpsilonRate = (ones, zeroes) => ones < zeroes;


// Check if all binaries are the same length for precaution
const binariesLengthEqual = binaries.map(bit => bit.length).every((bit, _, array) => bit === array[0]);

if (binariesLengthEqual) {
  const gamma = [];
  const epsilon = [];

  // Loop over the binaries length
  for (let index = 0; index < binaries[0].length; index += 1) {
    // Get an array of the bit at index position of all binaries
    const indexBitArray = binaries.map(bits => Number(bits.charAt(index)));

    const ones = indexBitArray.filter(bit => bit === 1).length;
    const zeroes = indexBitArray.filter(bit => bit === 0).length;

    gamma.push(getGammaRate(ones, zeroes) ? '1' : '0');
    epsilon.push(getEpsilonRate(ones, zeroes) ? '1' : '0');
  }

  const gammaRate = parseInt(gamma.join(''), 2);
  const epsilonRate = parseInt(epsilon.join(''), 2);

  console.log('The gamma rate is: ' + gammaRate);
  console.log('The epsilon rate is: ' + epsilonRate);
  console.log('The final result is: ' + gammaRate * epsilonRate);
} else {
  console.log('All binaries need to be the same length.');
}
