type Argument = { value: number; mode: 'position' | 'immediate' };

type Operation = {
  argCount: number;
  run: (args: Argument[]) => void;
};

const PARAMETER_PARSE = /^(\d+)(\d\d)|(\d+)$/;

export class IntcodeProgram {
  public pointer = 0;

  public static parse(contents: string) {
    return contents.split(',').map(op => parseInt(op, 10));
  }

  constructor(private intcode: number[], private input?: number) {}

  public run(recovery1?: number, recovery2?: number) {
    if (recovery1) {
      this.writeValue(1, recovery1);
    }
    if (recovery2) {
      this.writeValue(2, recovery2);
    }

    while (this.getValue() !== 99) {
      this.runInstructionSet();
    }

    console.log('terminated at index', this.pointer);
    return this.getValue(this.pointer + 1);
  }

  private runInstructionSet() {
    const [, modes, opParsed, opSimple] = PARAMETER_PARSE.exec(this.getValue().toString());

    const code = Number(modes ? opParsed : opSimple);
    const modeString = modes ?? '';
    const operation = this.getOperation(code);

    const args: Argument[] = [...modeString.padStart(operation.argCount, '0')]
      .map(Number)
      .reverse()
      .map((arg, index) => ({
        value: this.getValue(this.pointer + 1 + index),
        mode: arg === 1 ? 'immediate' : 'position',
      }));

    operation.run(args);
    this.pointer += operation.argCount + 1;
  }

  private getOperation(currentInstruction: number): Operation {
    switch (currentInstruction) {
      case 1: {
        return {
          argCount: 3,
          run: ([arg1, arg2, out]) => {
            const res = this.getValue(arg1) + this.getValue(arg2);
            // console.log(`01: ${this.getValue(arg1)} + ${this.getValue(arg2)} = ${res}`);
            this.writeValue(out.value, res);
          },
        };
      }
      case 2: {
        return {
          argCount: 3,
          run: ([arg1, arg2, out]) => {
            const res = this.getValue(arg1) * this.getValue(arg2);
            // console.log(`02: ${this.getValue(arg1)} * ${this.getValue(arg2)} = ${res}`);
            this.writeValue(out.value, res);
          },
        };
      }
      case 3: {
        return {
          argCount: 1,
          run: ([out]) => {
            // console.log('03: writing to', out.value);
            if (this.input) {
              this.writeValue(out.value, this.input);
            }
          },
        };
      }
      case 4: {
        return {
          argCount: 1,
          run: ([out]) => {
            if (this.input) {
              console.log(this.getValue(out.value));
            } else {
              console.log('no input specified');
            }
          },
        };
      }
      default: {
        throw new Error(`unknown instruction: ${currentInstruction}`);
      }
    }
  }

  private getValue(positionOrArgument?: number | Argument) {
    if (!positionOrArgument) {
      return this.intcode[this.pointer];
    }

    if (typeof positionOrArgument === 'number') {
      return this.intcode[positionOrArgument];
    }

    if (positionOrArgument.mode === 'position') {
      return this.intcode[positionOrArgument.value];
    }

    return positionOrArgument.value;
  }

  private writeValue(position: number, value: number) {
    this.intcode[position] = value;
  }
}
