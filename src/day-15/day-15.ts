import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day15 {
    ingredients = new Map<string, number[]>()
    init(values: string[]) {
        for (const value of values) {
            const [
                name,
                ,
                capacity,
                ,
                durability,
                ,
                flavor,
                ,
                texture,
                ,
                calories,
            ] = value.replace(':', '').replace(/,/g, '').split(' ')
            this.ingredients.set(
                name,
                [capacity, durability, flavor, texture, calories].map(Number)
            )
        }
    }

    solve(values: string[], part1: boolean = true): number {
        this.init(values)

        let maxScore = 0
        const [A, B, C, D] = Array.from(this.ingredients.values())

        for (let i = 15; i < 35; i += 1) {
            for (let j = 15; j < 35; j += 1) {
                for (let k = 15; k < 35; k += 1) {
                    for (let l = 15; l < 35; l += 1) {
                        if (i + j + k + l === 100) {
                            if (
                                !part1 &&
                                A[4] * i + B[4] * j + C[4] * k + D[4] * l !==
                                    500
                            )
                                continue
                            let score =
                                A[0] * i + B[0] * j + C[0] * k + D[0] * l
                            score *= A[1] * i + B[1] * j + C[1] * k + D[1] * l
                            score *= A[2] * i + B[2] * j + C[2] * k + D[2] * l
                            score *= A[3] * i + B[3] * j + C[3] * k + D[3] * l

                            if (score > maxScore) {
                                maxScore = score
                            }
                        }
                    }
                }
            }
        }

        return maxScore
    }
}

const day15 = new Day15()
console.log(day15.solve(input)) // 18965440
console.log(day15.solve(input, false)) // 18965440
