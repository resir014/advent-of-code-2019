type ArgumentMode = 'position' | 'immediate';
type Argument = { value: number; mode: ArgumentMode };

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

    console.log('terminated at pointer', this.pointer);
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
        // add
        return {
          argCount: 3,
          run: ([arg1, arg2, out]) => {
            const res = this.getValue(arg1) + this.getValue(arg2);
            console.log(`01: ${this.getValue(arg1)} + ${this.getValue(arg2)} = ${res}`);
            this.writeValue(out.value, res);
          },
        };
      }
      case 2: {
        // multiply
        return {
          argCount: 3,
          run: ([arg1, arg2, out]) => {
            const res = this.getValue(arg1) * this.getValue(arg2);
            console.log(`02: ${this.getValue(arg1)} * ${this.getValue(arg2)} = ${res}`);
            this.writeValue(out.value, res);
          },
        };
      }
      case 3: {
        // input
        return {
          argCount: 1,
          run: ([out]) => {
            console.log(`03: writing ${this.input} to pointer ${out.value}`);
            if (this.input) {
              this.writeValue(out.value, this.input);
            }
          },
        };
      }
      case 4: {
        // output
        return {
          argCount: 1,
          run: ([out]) => {
            console.log(`04: printing pointer ${out.value}`);
            if (this.input) {
              console.log(this.getValue(out.value));
            } else {
              console.log('no input specified');
            }
          },
        };
      }
      case 5: {
        // jump-if-true
        return {
          argCount: 2,
          run: ([arg, pos]) => {
            console.log(`05: ${this.getValue(arg)}, ${this.getValue(pos)}`);
            if (this.getValue(arg) !== 0) {
              this.pointer = pos.value - 3; // step back to prevent pointer increment overriding
            }
          },
        };
      }
      case 6: {
        // jump-if-false
        return {
          argCount: 2,
          run: ([arg, pos]) => {
            console.log(`06: ${this.getValue(arg)}, ${this.getValue(pos)}`);
            if (this.getValue(arg) === 0) {
              this.pointer = pos.value - 3; // step back to prevent pointer increment overriding
            }
          },
        };
      }
      case 7: {
        // less than
        return {
          argCount: 3,
          run: ([arg1, arg2, pos]) => {
            console.log(`07: ${this.getValue(arg1)}, ${this.getValue(arg2)}`);
            if (this.getValue(arg1) < this.getValue(arg2)) {
              this.writeValue(this.getValue(pos.value), 1);
            } else {
              this.writeValue(this.getValue(pos.value), 0);
            }
          },
        };
      }
      case 8: {
        // equal
        return {
          argCount: 3,
          run: ([arg1, arg2, pos]) => {
            console.log(`08: ${this.getValue(arg1)}, ${this.getValue(arg2)}`);
            if (this.getValue(arg1) === this.getValue(arg2)) {
              this.writeValue(this.getValue(pos.value), 1);
            } else {
              this.writeValue(this.getValue(pos.value), 0);
            }
          },
        };
      }
      default: {
        console.log(`Error: unknown instruction: ${currentInstruction} (index ${this.pointer})`);
        console.log('stack trace:', this.intcode.join(','));
        throw new Error(`unknown instruction: ${currentInstruction} (index ${this.pointer})`);
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
