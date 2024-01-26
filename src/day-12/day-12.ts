import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt')

class Day12 {
    computeSum(value: unknown): number {
        let sum = 0

        if (Array.isArray(value)) {
            for (const item of value) {
                sum += this.computeSum(item)
            }
        } else if (typeof value === 'object' && value) {
            for (const item of Object.values(value)) {
                sum += this.computeSum(item)
            }
        } else if (typeof value === 'number') {
            sum += value
        }

        return sum
    }

    computeSum2(value: unknown): number {
        let sum = 0

        if (Array.isArray(value)) {
            for (const item of value) {
                sum += this.computeSum2(item)
            }
        } else if (typeof value === 'object' && value) {
            const values = Object.values(value)
            if (values.every((e) => e !== 'red')) {
                for (const item of values) {
                    sum += this.computeSum2(item)
                }
            }
        } else if (typeof value === 'number') {
            sum += value
        }

        return sum
    }

    solve(value: string, part1: boolean = true): number {
        if (part1) return this.computeSum(JSON.parse(value))
        return this.computeSum2(JSON.parse(value))
    }
}

const day12 = new Day12()
console.log(day12.solve(input)) // 111754
console.log(day12.solve(input, false)) // 65402
