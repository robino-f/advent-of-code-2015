import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day23 {
    solve(value: string[], part1: boolean = true): number {
        const values = new Map<string, number>()
        let i = 0
        if (!part1) values.set('a', 1)

        while (i < value.length) {
            const [instruction, offSet, prefix] = value[i]
                .replace(',', '')
                .split(' ')

            switch (instruction) {
                case 'hlf':
                    values.set(offSet, (values.get(offSet) ?? 0) / 2)
                    i += 1
                    break
                case 'tpl':
                    values.set(offSet, (values.get(offSet) ?? 0) * 3)
                    i += 1
                    break
                case 'inc':
                    values.set(offSet, (values.get(offSet) ?? 0) + 1)
                    i += 1
                    break
                case 'jmp':
                    i += Number(offSet)
                    break
                case 'jie':
                    if ((values.get(offSet) ?? 0) % 2 === 0) {
                        i += Number(prefix)
                    } else {
                        i += 1
                    }
                    break
                case 'jio':
                    if ((values.get(offSet) ?? 0) === 1) {
                        i += Number(prefix)
                    } else {
                        i += 1
                    }
                    break
            }
        }

        return values.get('b') ?? 0
    }
}

const day23 = new Day23()
console.log(day23.solve(input)) // 307
console.log(day23.solve(input, false)) // 160
