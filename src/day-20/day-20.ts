import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt')

class Day20 {
    solve(value: number, part1: boolean = true): number {
        const houses: number[] = Array(value / 10)
        for (let elf = 1; elf < value / 10; elf += 1) {
            let visits = 0
            for (let house = elf; house < value / 10; house += elf) {
                if (!houses[house]) houses[house] = 0

                if (part1) {
                    houses[house] += elf * 10
                } else {
                    if (visits < 50) {
                        houses[house] += elf * 11
                        visits += 1
                    }
                }
            }
        }

        return houses.findIndex((v) => v >= value)
    }
}

const day20 = new Day20()
console.log(day20.solve(Number(input))) // 831600
console.log(day20.solve(Number(input), false)) // 884520
