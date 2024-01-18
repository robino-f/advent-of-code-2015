import { readFile } from '../utils/read-file'
import crypto from 'crypto'

const input = readFile('./data/input.txt')

class Day4 {
    solve(value: string, prefix: string = '00000'): number {
        let currentPrefix = '';
        let i = 0;

        while (currentPrefix != prefix) {
            i += 1;
            currentPrefix = crypto.createHash('md5').update(`${value}${i}`).digest("hex").slice(0, prefix.length);
        }

        return i
    }
}

const day4 = new Day4()
console.log(day4.solve(input)) // 117946
console.log(day4.solve(input, '000000')) // 3938038