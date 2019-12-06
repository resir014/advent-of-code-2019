const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString('utf-8');

/**
 * gets the base fuel given the module's mass
 * @param {number} mass
 */
function getBaseFuel(mass) {
  return Math.floor(mass / 3) - 2;
}

/**
 * Day 1: Part 1
 *
 * @param {string} contents
 */
function part1(contents) {
  const fuels = [...contents.split(/\r?\n/)].map(line => {
    const mass = parseInt(line, 10);

    return getBaseFuel(mass);
  });

  return fuels.reduce((acc, val) => acc + val);
}

/**
 * Day 1: Part 2
 *
 * @param {string} contents
 */
function part2(contents) {
  const fuels = [...contents.split(/\r?\n/)].map(line => {
    const mass = parseInt(line, 10);

    return getBaseFuel(mass);
  });

  let addFuel = 0;

  for (const fuel of fuels) {
    let tempFuel = fuel;

    while (tempFuel > 0) {
      tempFuel = Math.floor(tempFuel / 3) - 2;

      if (tempFuel > 0) {
        addFuel = addFuel + tempFuel;
      }
    }
  }

  return fuels.reduce((acc, val) => acc + val) + addFuel;
}

console.log('part 1:', part1(contents));
console.log('part 2:', part2(contents));
