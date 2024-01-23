import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day8 {
    solvePart1(sequences: string[]): number {
        let sum = 0

        for (const sequence of sequences) {
            const characters = sequence
                .slice(1, sequence.length - 1)
                .replace(/\\\\/g, 'e')
                .replace(/\\x.{2}/g, 'e')
                .replace(/\\"/g, 'e')

            const unescapedSequence = sequence
                .replace(/\\\\/g, 'ee')
                .replace(/\\x.{2}/g, 'eeee')
                .replace(/\\"/g, 'ee')

            sum += unescapedSequence.length - characters.length
        }

        return sum
    }

    solvePart2(sequences: string[]): number {
        let sum = 0

        for (const sequence of sequences) {
            const escapedSequence = sequence
                .replace(/\\/g, 'ee')
                .replace(/"/g, 'ee')

            sum += escapedSequence.length + 2 - sequence.length
        }

        return sum
    }
}

const day8 = new Day8()
console.log(day8.solvePart1(input)) // 1371
console.log(day8.solvePart2(input)) // 2117
