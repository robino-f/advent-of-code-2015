import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day7 {
    values = new Map<string, number>()

    private getValues(instruction: string, separator: string): number[] {
        const [keyA, keyB] = instruction.split(separator)
        const valA = this.values.get(keyA) ?? Number(keyA)
        const valB = this.values.get(keyB) ?? Number(keyB)
        return [valA, valB]
    }

    solvePart1(instructions: string[]): number {
        while (this.values.size !== instructions.length) {
            for (const instruction of instructions) {
                const [leftSide, rightSide] = instruction.split(' -> ')

                if (leftSide.includes('AND')) {
                    const [valA, valB] = this.getValues(leftSide, ' AND ')
                    if (Number.isNaN(valA) || Number.isNaN(valB)) continue
                    this.values.set(rightSide, valA & valB)
                } else if (leftSide.includes('OR')) {
                    const [valA, valB] = this.getValues(leftSide, ' OR ')
                    if (Number.isNaN(valA) || Number.isNaN(valB)) continue
                    this.values.set(rightSide, valA | valB)
                } else if (leftSide.includes('LSHIFT')) {
                    const [valA, valB] = this.getValues(leftSide, ' LSHIFT ')
                    if (Number.isNaN(valA) || Number.isNaN(valB)) continue
                    this.values.set(rightSide, valA << valB)
                } else if (leftSide.includes('RSHIFT')) {
                    const [valA, valB] = this.getValues(leftSide, ' RSHIFT ')
                    if (Number.isNaN(valA) || Number.isNaN(valB)) continue
                    this.values.set(rightSide, valA >> valB)
                } else if (leftSide.includes('NOT')) {
                    const valA = this.values.get(leftSide.split(' ')[1])
                    if (valA === undefined) continue
                    this.values.set(rightSide, ~valA + 65536)
                } else {
                    const valA = this.values.get(leftSide) ?? Number(leftSide)
                    if (Number.isNaN(valA)) continue

                    this.values.set(rightSide, valA)
                }
            }
        }

        return this.values.get('a') ?? 0
    }

    solvePart2(instructions: string[]): number {
        const overrideValue = this.values.get('a') ?? 0
        const bInstruction = instructions.findIndex((instruction) =>
            instruction.endsWith('-> b')
        )
        instructions[bInstruction] = `${overrideValue} -> b`
        this.values.clear()

        return this.solvePart1(instructions)
    }
}

const day7 = new Day7()
console.log(day7.solvePart1(input)) // 956
console.log(day7.solvePart2(input)) // 40149
