import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day2 {
    solve(values: string[], part2 = false): number {
        let sum = 0

        for (const value of values) {
            const [l, w, h] = value.split('x').map(Number)
            const [x, y] = [l, w, h].sort((a, b) => a - b)

            if (!part2) {
                sum += 2 * l * w + 2 * w * h + 2 * h * l
                sum += x * y
            } else {
                sum += 2 * x + 2 * y
                sum += l * w * h
            }
        }

        return sum
    }
}

const day2 = new Day2()
console.log(day2.solve(input)) // 1598415
console.log(day2.solve(input, true)) // 3812909
