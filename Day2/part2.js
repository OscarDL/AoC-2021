const commands = require('./commands.json');


const changeDirection = (coordinates, direction, value) => {
  switch (direction) {
    case 'forward': {
      coordinates = {
        ...coordinates,
        x: coordinates.x + value, // increase horizontal position
        y: coordinates.y + (coordinates.z * value) // increase depth by aim * value
      }
      break;
    }

    case 'down': {
      coordinates = {
        ...coordinates,
        z: coordinates.z + value // increase aim
      }
      break;
    }

    case 'up': {
      coordinates = {
        ...coordinates,
        z: coordinates.z - value // decrease aim
      }
      break;
    }
  }

  return coordinates;
};

const getCoordinates = (commands) => {
  // x = horizontal, y = depth, z = aim
  let coordinates = { x: 0, y: 0, z: 0 };

  for (const command of commands) {
    const [direction, value] = command.split(' ');
    coordinates = changeDirection(coordinates, direction, Number(value));
  }

  const result = coordinates.x * coordinates.y;
  console.log(
    'The final coordinates for the submarine are:' + 
    ' x = ' + coordinates.x +
    ' | y = ' + coordinates.y +
    ' | aim = ' + coordinates.z +
    ' (multiplied: ' + result + ').'
  );
};


getCoordinates(commands);
