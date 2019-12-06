const fs = require('fs');
const path = require('path');

const contents = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString('utf-8');

/**
 * runs the opcode
 * @param {number[]} opcode
 * @param {number} recovery1
 * @param {number} recovery2
 */
function runProgram(opcode, recovery1 = 0, recovery2 = 0) {
  // store in variable to prevent mutation
  const temp = opcode;

  temp[1] = recovery1;
  temp[2] = recovery2;
  let currentIndex = 0;

  while (temp[currentIndex] !== 99) {
    const pos1 = temp[currentIndex + 1];
    const pos2 = temp[currentIndex + 2];
    const pos3 = temp[currentIndex + 3];

    let value = 0;

    if (temp[currentIndex] === 1) {
      value = temp[pos1] + temp[pos2];
    } else {
      value = temp[pos1] * temp[pos2];
    }

    temp[pos3] = value;

    currentIndex += 4;
  }

  return temp[0];
}

/**
 * Day 2, Part 1
 *
 * @param {string} contents
 */
function part1(contents) {
  const opcode = contents.split(',').map(op => parseInt(op, 10));
  return runProgram(opcode, 12, 2);
}

/**
 * Day 2, Part 2
 *
 * @param {string} contents
 */
function part2(contents) {
  const opcode = contents.split(',').map(op => parseInt(op, 10));

  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const result = runProgram([...opcode], i, j);
      if (result === 19690720) {
        return 100 * i + j;
      }
    }
  }

  return -1;
}

console.log('part 1:', part1(contents));
console.log('part 2:', part2(contents));
