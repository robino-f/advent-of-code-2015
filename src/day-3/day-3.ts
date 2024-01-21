import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt')

class Day3 {
    solve(values: string): number {
        const coordinates = new Set([`0;0`])
        let x = 0
        let y = 0

        for (const c of values) {
            if (c === '^') {
                y += 1
            } else if (c === 'v') {
                y -= 1
            } else if (c === '>') {
                x += 1
            } else if (c === '<') {
                x -= 1
            }

            coordinates.add(`${x};${y}`)
        }

        return coordinates.size
    }

    solvePart2(values: string): number {
        const coordinates = new Set([`0;0`])
        let xSanta = 0
        let ySanta = 0
        let xRobo = 0
        let yRobo = 0

        for (let i = 0; i < values.length; i += 1) {
            const c = values[i]
            let xInc = 0
            let yInc = 0

            if (c === '^') {
                yInc += 1
            } else if (c === 'v') {
                yInc -= 1
            } else if (c === '>') {
                xInc += 1
            } else if (c === '<') {
                xInc -= 1
            }

            if (i % 2 === 0) {
                xSanta += xInc
                ySanta += yInc
                coordinates.add(`${xSanta};${ySanta}`)
            } else {
                xRobo += xInc
                yRobo += yInc
                coordinates.add(`${xRobo};${yRobo}`)
            }
        }

        return coordinates.size
    }
}

const day3 = new Day3()
console.log(day3.solve(input)) // 2081
console.log(day3.solvePart2(input)) // 2341
