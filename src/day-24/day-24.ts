import 'lodash.combinations'
import _ from 'lodash'
import { readFile } from '../utils/read-file'
import { sum } from '../utils/array'

const input = readFile('./data/input.txt').split('\n')

class Day24 {
    maxWeight = 0
    maxGroupSize = 100

    solve(values: string[], part1: boolean = true): number {
        const packages = values.map(Number).sort((a, b) => (a > b ? -1 : 1))
        const divider = part1 ? 3 : 4
        this.maxWeight = sum(packages) / divider
        const combinations = (
            _ as unknown as { combinations: Function }
        ).combinations(packages, Math.round(packages.length / divider) - 2)

        let validCombinations: number[][] = []
        for (const combination of combinations) {
            let sum = 0
            let nextCombination: number[] = []
            for (let i = 0; i < combination.length; i += 1) {
                if (sum + combination[i] <= this.maxWeight) {
                    nextCombination.push(combination[i])
                    sum += combination[i]
                    if (sum === this.maxWeight) break
                }
            }
            if (sum === this.maxWeight) {
                validCombinations.push(nextCombination)
            }
        }

        validCombinations = validCombinations.sort((a, b) =>
            a.length > b.length ? 1 : -1
        )
        validCombinations = validCombinations.filter(
            (v) => v.length === validCombinations[0].length
        )

        return Math.min(
            ...validCombinations.map((vc) => vc.reduce((acc, v) => acc * v, 1))
        )
    }
}

const day24 = new Day24()
console.log(day24.solve(input)) // 11266889531
console.log(day24.solve(input, false)) // 77387711
