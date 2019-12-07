export type Direction = 'U' | 'D' | 'L' | 'R';

export type InstructionSet = {
  direction: Direction;
  length: number;
};
