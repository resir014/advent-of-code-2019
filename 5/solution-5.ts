import * as path from 'path';
import { getInput } from '../utils/input';
import { Program } from '../utils/opcode';

const contents = getInput(path.resolve(__dirname, './input.txt'));

const opcode = Program.parse(contents);
const program = new Program(opcode, 1).run();
