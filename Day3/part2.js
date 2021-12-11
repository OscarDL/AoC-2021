const binaries = require('./binaries.json');


// Most common bit value, if equal -> 1
const getOxygenValue = (ones, zeroes) => ones >= zeroes ? '1' : '0';

// Least common bit value, if equal -> 0
const getCO2Value = (ones, zeroes) => zeroes > ones ? '1' : '0';


const getFinalRating = ({array, type}) => {
  // Loop over the binaries length
  for (let index = 0; index < array[0].length; index += 1) {
    // Get an array of the bit at index position of remaining oxygen binaries
    const indexBitArray = array.map(bits => Number(bits.charAt(index)));

    const ones = indexBitArray.filter(bit => bit === 1).length;
    const zeroes = indexBitArray.filter(bit => bit === 0).length;

    let mostCommonValue;
    if (type === 'oxygen') {
      mostCommonValue = getOxygenValue(ones, zeroes);
    } else {
      mostCommonValue = getCO2Value(ones, zeroes);
    }

    // Narrow down the binaries array to the most common value at current index
    array = array.filter(binary => binary.split('')[index] === mostCommonValue);

    if (array.length === 1) break; // Don't keep looping if we have the result
  }

  return parseInt(array[0], 2);
};


// Check if all binaries are the same length for precaution
const binariesLengthEqual = binaries.map(bit => bit.length).every((bit, _, array) => bit === array[0]);

if (binariesLengthEqual) {
  let co2 = binaries, oxygen = binaries;

  const co2Rating = getFinalRating({array: co2, type: 'co2'});
  const oxygenRating = getFinalRating({array: oxygen, type: 'oxygen'});

  console.log('The co2 rating is: ' + co2Rating);
  console.log('The oxygen rating is: ' + oxygenRating);
  console.log('The final result is: ' + co2Rating * oxygenRating);
} else {
  console.log('All binaries need to be the same length.');
}
