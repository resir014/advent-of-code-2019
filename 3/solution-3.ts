import fs from 'fs';
import path from 'path';

const contents = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString();
const firstInstruction = contents.split(/\r?\n/)[0];
const secondInstruction = contents.split(/\r?\n/)[0];

class Point {
  constructor(private x: number = 1, private y: number = 1) {}
}

class Wire {
  constructor(private instructionList: string) {}
}

class WireBoard {
  constructor(private instruction1: string, private instruction2: string) {}
}

function part1(instruction1: string, instruction2: string) {
  console.log(instruction1);
  console.log(instruction2);
}

part1(firstInstruction, secondInstruction);
