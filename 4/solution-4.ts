const input = [108457, 562041] as const;

/**
 * Day 4, Part 1
 */
function part1(min: number, max: number) {
  let possibleCombinations = 0;
  let current = min;

  for (let i = min; i <= max; i++) {
    const digits = current
      .toString()
      .split('')
      .map(y => parseInt(y, 10));

    let check = 0;
    let adjacentCount = 0;
    let increasingCheck = 0;

    // do we have two similar adjacent digits?
    for (let j = 0; j < digits.length; j++) {
      if (typeof digits[j + 1] !== 'undefined' && digits[j] === digits[j + 1]) {
        adjacentCount += 1;
      }
    }

    if (adjacentCount === 0) {
      check += 1;
    }
    adjacentCount = 0;

    // does the digits increase overtime?
    for (let j = 0; j < digits.length; j++) {
      if (typeof digits[j + 1] !== 'undefined' && digits[j] > digits[j + 1]) {
        increasingCheck += 1;
      }
    }

    if (increasingCheck !== 0) {
      check += 1;
    }
    increasingCheck = 0;

    if (check === 0) {
      possibleCombinations += 1;
    }

    current += 1;
  }

  console.log('part 1:', possibleCombinations);
}

function strictFindAdjacent(digits: string) {
  const checkAdjacentRegex = /(\d)\1+/g;
  const matches = digits.match(checkAdjacentRegex);

  if (!matches) {
    return false;
  }

  const groupsofTwo = matches.filter(match => match.length === 2);

  return groupsofTwo.length > 0;
}

/**
 * Day 4, Part 2
 */
function part2(min: number, max: number) {
  let possibleCombinations = 0;
  let current = min;

  for (let i = min; i <= max; i++) {
    const digits = current
      .toString()
      .split('')
      .map(y => parseInt(y, 10));

    let check = 0;
    let increasingCheck = 0;

    if (!strictFindAdjacent(current.toString())) {
      check += 1;
    }

    // does the digits increase overtime?
    for (let j = 0; j < digits.length; j++) {
      if (typeof digits[j + 1] !== 'undefined' && digits[j] > digits[j + 1]) {
        increasingCheck += 1;
      }
    }

    if (increasingCheck !== 0) {
      check += 1;
    }
    increasingCheck = 0;

    if (check === 0) {
      possibleCombinations += 1;
    }

    current += 1;
  }

  console.log('part 2:', possibleCombinations);
}

part1(...input);
part2(...input);
