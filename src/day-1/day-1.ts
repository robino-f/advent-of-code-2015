const { readFile } = require('../utils/read-file')

const input = readFile('./data/input.txt')

class Day1 {
    solve(value: string, part2 = false): number {
        let valueBeforeRemoving = value

        let floor = 0
        for (let i = 0; i < valueBeforeRemoving.length; i += 1) {
            if (valueBeforeRemoving[i] === '(') floor += 1
            else if (valueBeforeRemoving[i] === ')') floor -= 1

            if (part2 && floor == -1) return i + 1
        }

        return floor
    }
}

const day1 = new Day1()
console.log(day1.solve(input)) // 232
console.log(day1.solve(input, true)) // 1782
