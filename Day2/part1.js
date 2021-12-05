const commands = require('./commands.json');


const changeDirection = (coordinates, direction, value) => {
  switch (direction) {
    case 'forward': {
      coordinates = {
        ...coordinates,
        x: coordinates.x + value // increase horizontal position
      }
      break;
    }

    case 'down': {
      coordinates = {
        ...coordinates,
        y: coordinates.y + value // increase depth
      }
      break;
    }

    case 'up': {
      coordinates = {
        ...coordinates,
        y: coordinates.y - value // decrease depth
      }
      break;
    }
  }

  return coordinates;
};

const getCoordinates = (commands) => {
  // x = horizontal, y = depth
  let coordinates = { x: 0, y: 0 };

  for (const command of commands) {
    const [direction, value] = command.split(' ');
    coordinates = changeDirection(coordinates, direction, Number(value));
  }

  const result = coordinates.x * coordinates.y;
  console.log(`The final coordinates for the submarine are: x = ${coordinates.x} | y = ${coordinates.y} (multiplied: ${result}).`);
};


getCoordinates(commands);
