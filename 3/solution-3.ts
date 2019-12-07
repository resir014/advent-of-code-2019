import fs from 'fs';
import path from 'path';
import { InstructionSet, Direction } from './utils/types';
import { Point } from './utils/Point';

const contents = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString();
const firstInstruction = contents.split(/\r?\n/)[0];
const secondInstruction = contents.split(/\r?\n/)[0];

function createWireMap(instructionSet: InstructionSet[]) {
  const pos = new Point();
}

function createInstructionSet(wire: string[]): InstructionSet[] {
  const instructionSet: InstructionSet[] = [];

  for (const step of wire) {
    const [dir, length] = [step.charAt(0), parseInt(step.substring(2), 10)];
    const set: InstructionSet = {
      direction: dir as Direction,
      length,
    };

    instructionSet.push(set);
  }

  return instructionSet;
}

function part1(instruction1: string, instruction2: string) {
  const input1 = createInstructionSet(instruction1.split(','));
  const input2 = createInstructionSet(instruction2.split(','));

  console.log(input1);
  console.log(input2);
}

part1(firstInstruction, secondInstruction);
