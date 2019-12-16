import * as path from 'path';
import { getInput } from '../utils/input';
import { IntcodeProgram } from '../utils/intcode';

const contents = getInput(path.resolve(__dirname, './input.txt'));

const opcode = IntcodeProgram.parse(contents);

function part1() {
  console.log('day 5 part 1 (input: 1)');
  new IntcodeProgram(opcode, 1).run();
}

function part2() {
  console.log('day 5 part 2 (input: 5)');
  new IntcodeProgram(opcode, 5).run();
}

part1();
part2();
