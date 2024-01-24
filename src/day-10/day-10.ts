import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt')

class Day10 {
    applyLookAndSay(value: string): string {
        let newValue = ''
        let serie = 0;
        let lastChar = value[0]
        for (let i = 0; i < value.length; i += 1) {
            const char = value[i]

            if (char === lastChar) {
                serie += 1
            }

            if (i === value.length - 1 || char !== value[i + 1]) {
                newValue += `${serie}${char}`
                serie = 1
            }

            lastChar = char
        }

        return newValue
    }

    solve(value: string, applications: number = 40): number {
        let currentValue: string = value
        for (let i = 0; i < applications; i += 1) {
            currentValue = this.applyLookAndSay(currentValue)
        }
        return currentValue.length
    }
}

const day10 = new Day10()
console.log(day10.solve(input)) // 329356
console.log(day10.solve(input, 50)) // 4666278
