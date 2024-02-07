import { readFile } from '../utils/read-file'
import { sum } from '../utils/array'

const input = readFile('./data/input.txt').split('\n')

class Day24 {
    maxWeight = 0
    maxGroupSize = 100

    getCombinations(
        packages: number[],
        combination: number[] = []
    ): Set<string> {
        if (combination.length > this.maxGroupSize) return new Set()
        const combinationSum = sum(combination)
        if (combinationSum === this.maxWeight) {
            if (this.maxGroupSize > combination.length) {
                this.maxGroupSize = combination.length
            }
            return new Set([combination.sort().join()])
        }

        const combinations = new Set<string>()
        for (const p of packages) {
            const nextCombination = [...combination, p]
            if (sum(nextCombination) <= this.maxWeight) {
                Array.from(
                    this.getCombinations(
                        packages.filter((v) => v !== p),
                        nextCombination
                    )
                ).forEach((c) => combinations.add(c))
            }
        }

        return combinations
    }

    solve(values: string[], part1: boolean = true): number {
        const packages = values.map(Number).sort((a, b) => (a > b ? -1 : 1))
        this.maxWeight = sum(packages) / (part1 ? 3 : 4)

        const combinations = Array.from(this.getCombinations(packages)).map(
            (c) => c.split(',').map(Number)
        )

        return Math.min(
            ...combinations.map((cc) => cc.reduce((acc, v) => acc * v, 1))
        )
    }
}

const day24 = new Day24()
console.log(day24.solve(input)) // 11266889531
console.log(day24.solve(input, false)) // 77387711
