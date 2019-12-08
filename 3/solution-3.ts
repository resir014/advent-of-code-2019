import fs from 'fs';
import path from 'path';
import { InstructionSet, Direction } from './utils/types';
import { Point } from './utils/Point';
import { Line } from './utils/Line';

const contents = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString();
const firstInstruction = contents.split(/\r?\n/)[0];
const secondInstruction = contents.split(/\r?\n/)[1];

function getIntersection(line1: Line, line2: Line) {
  return new Point();
}

function getIntersectionList(wire1: Line[], wire2: Line[]) {
  let intersections: Point[] = [];

  // for (const line1 of wire1) {
  //   for (const line2 of wire2) {
  //     const intersection = getIntersection(line1, line2);
  //     intersections.push(intersection);
  //   }
  // }

  return intersections;
}

function createWireMap(instructionSet: InstructionSet[]) {
  let pos = new Point();
  let wireMap: Line[] = [];

  for (const instruction of instructionSet) {
    const { direction, length } = instruction;
    let endPos;
    let wire;

    switch (direction) {
      case 'U': {
        endPos = new Point(pos.x, pos.y + length);
        break;
      }
      case 'D': {
        endPos = new Point(pos.x, pos.y - length);
        break;
      }
      case 'L': {
        endPos = new Point(pos.x - length, pos.y);
        break;
      }
      case 'R': {
        endPos = new Point(pos.x + length, pos.y);
        break;
      }
      default: {
        throw new Error('Unexpected direction');
      }
    }

    wire = new Line(pos, endPos);
    wireMap.push(wire);
    pos = endPos;
  }

  return wireMap;
}

function createInstructionSet(wire: string[]): InstructionSet[] {
  const instructionSet: InstructionSet[] = [];

  for (const step of wire) {
    const [dir, length] = [step.charAt(0), parseInt(step.substring(1), 10)];
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

  const wire1 = createWireMap(input1);
  const wire2 = createWireMap(input2);

  getIntersectionList(wire1, wire2);
}

part1(firstInstruction, secondInstruction);
