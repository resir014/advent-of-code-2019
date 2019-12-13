import * as fs from 'fs';

export function getInput(path: string) {
  return fs.readFileSync(path).toString('utf-8');
}
