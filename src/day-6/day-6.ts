import { readFile } from '../utils/read-file'
import { createGrid } from '../utils/array'

const input = readFile('./data/input.txt').split('\n')

class Day6 {
    getInstructionCoordinates(instruction: string): number[] {
        const [coordA, , coordB] = instruction
            .replace('turn on', '')
            .replace('toggle', '')
            .replace('turn off', '')
            .replace('through', '')
            .trim()
            .split(' ')

        return [coordA, coordB].flatMap((coord) =>
            coord.split(',').map((e) => Number(e))
        )
    }

    solvePart1(instructions: [string]): number {
        const grid = createGrid(false)

        for (const instruction of instructions) {
            const [xA, yA, xB, yB] = this.getInstructionCoordinates(instruction)

            if (instruction.startsWith('turn on')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        grid[i][j] = true
                    }
                }
            } else if (instruction.startsWith('toggle')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        grid[i][j] = !grid[i][j]
                    }
                }
            } else if (instruction.startsWith('turn off')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        grid[i][j] = false
                    }
                }
            }
        }

        let lightsOn = 0
        grid.forEach((line) =>
            line.forEach((e) => {
                if (e) lightsOn += 1
            })
        )

        return lightsOn
    }

    solvePart2(instructions: [string]): number {
        const grid = createGrid(0)

        for (const instruction of instructions) {
            const [xA, yA, xB, yB] = this.getInstructionCoordinates(instruction)

            if (instruction.startsWith('turn on')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        grid[i][j] += 1
                    }
                }
            } else if (instruction.startsWith('toggle')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        grid[i][j] += 2
                    }
                }
            } else if (instruction.startsWith('turn off')) {
                for (let i = xA; i <= xB; i += 1) {
                    for (let j = yA; j <= yB; j += 1) {
                        if (grid[i][j] > 0) grid[i][j] -= 1

                    }
                }
            }
        }

        let lightsOn = 0
        grid.forEach((line) =>
            line.forEach((e) => {
                if (e) lightsOn += e
            })
        )

        return lightsOn
    }
}

const day6 = new Day6()
console.log(day6.solvePart1(input)) // 543903
console.log(day6.solvePart2(input)) // 14687245
