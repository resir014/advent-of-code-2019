import { IntcodeProgram } from './intcode';

describe('utils/intcode', () => {
  describe('IntcodeProgram', () => {
    test('runs with input', () => {
      const input = '3,0,4,0,99'.split(',').map(Number);

      const program = new IntcodeProgram(input, 1);
      program.run();
    });
  });
});
