const fs = require('fs');

const contents = fs.readFileSync('./input.txt').toString('utf-8');

/**
 * runs the opcode
 * @param {number[]} opcode
 * @param {[number = 0]} recovery1
 * @param {[number = 0]} recovery2
 */
function runProgram(opcode, recovery1, recovery2) {
  const tempOpcode = opcode;

  tempOpcode[1] = recovery1;
  tempOpcode[2] = recovery2;
  let currentIndex = 0;

  while (tempOpcode[currentIndex] !== 99) {
    const pos1 = tempOpcode[currentIndex + 1];
    const pos2 = tempOpcode[currentIndex + 2];
    const pos3 = tempOpcode[currentIndex + 3];

    let value = 0;

    if (tempOpcode[currentIndex] === 1) {
      value = tempOpcode[pos1] + tempOpcode[pos2];
    } else {
      value = tempOpcode[pos1] * tempOpcode[pos2];
    }

    tempOpcode[pos3] = value;

    currentIndex += 4;
  }

  return tempOpcode[0];
}

/**
 * Day 2, Part 1
 *
 * @param {string} contents
 */
function part1(contents) {
  const opcode = contents.split(',').map(op => parseFloat(parseInt(op, 10)));
  return runProgram(opcode, 12, 2);
}

/**
 * Day 2, Part 2
 *
 * @param {string} contents
 */
function part2(contents) {
  const opcode = contents.split(',').map(op => parseFloat(parseInt(op, 10)));

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
