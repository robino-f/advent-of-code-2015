import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day16 {
    solve(values: string[], part1: boolean = true): number {
        const information: { [key: string]: number } = {
            children: 3,
            cats: 7,
            samoyeds: 2,
            pomeranians: 3,
            akitas: 0,
            vizslas: 0,
            goldfish: 5,
            trees: 3,
            cars: 2,
            perfumes: 1,
        }
        let sueIndex = -1

        for (const value of values) {
            const [, index] = value.match(/Sue (\d+)/) ?? []

            let things = value
                .replace(/Sue (\d+): /, '')
                .split(', ')
                .map((thing) => {
                    const [name, number] = thing.split(': ')
                    return {
                        name,
                        number: Number(number),
                    }
                })

            let isMatching: boolean
            if (part1) {
                isMatching = things.every((thing) => {
                    return information[thing.name] === thing.number
                })
            } else {
                isMatching =
                    things
                        .filter((thing) =>
                            ['cats', 'trees'].includes(thing.name)
                        )
                        .every((thing) => {
                            return information[thing.name] < thing.number
                        }) &&
                    things
                        .filter((thing) =>
                            ['pomeranians', 'goldfish'].includes(thing.name)
                        )
                        .every((thing) => {
                            return information[thing.name] > thing.number
                        }) &&
                    things
                        .filter(
                            (thing) =>
                                ![
                                    'cats',
                                    'trees',
                                    'pomeranians',
                                    'goldfish',
                                ].includes(thing.name)
                        )
                        .every((thing) => {
                            return information[thing.name] === thing.number
                        })
            }

            if (isMatching) {
                sueIndex = Number(index)
                break
            }
        }

        return sueIndex
    }
}

const day16 = new Day16()
console.log(day16.solve(input)) // 103
console.log(day16.solve(input, false)) // 405
