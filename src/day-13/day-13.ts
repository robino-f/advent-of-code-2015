import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day13 {
    relations = new Map<string, { [key: string]: number }>()

    findCombinations(
        persons: string[],
        combination: string[] = []
    ): string[][] {
        if (persons.length === 0) return [combination]

        return persons.flatMap((person) => {
            const nextPersons = persons.filter((p) => p !== person)

            return this.findCombinations(nextPersons, [...combination, person])
        })
    }

    solve(values: string[], part1: boolean = true): number {
        for (const value of values) {
            const [A, , symbol, hapinessUnit, , , , , , , B] = value.split(' ')
            if (!this.relations.has(A)) this.relations.set(A, {})

            const relation = this.relations.get(A)
            if (relation) {
                relation[B.slice(0, B.length - 1)] =
                    Number(hapinessUnit) * (symbol === 'gain' ? 1 : -1)
            }
        }

        const persons = Array.from(this.relations.keys())

        if (!part1) {
            this.relations.set('Me', {})
            for (const person of persons) {
                let relation = this.relations.get('Me')
                if (relation) {
                    relation[person] = 0
                }

                relation = this.relations.get(person)
                if (relation) {
                    relation['Me'] = 0
                }
            }
            persons.push('Me')
        }

        const p1 = persons[0]
        const combinations = this.findCombinations(
            persons.filter((p) => p !== p1),
            [p1]
        )

        return Math.max(
            ...combinations.map((ps) => {
                let sum = 0

                for (let i = 0; i < ps.length; i += 1) {
                    const currentPerson = this.relations.get(ps[i])
                    if (currentPerson) {
                        const neighborA = i > 0 ? ps[i - 1] : ps[ps.length - 1]
                        const neighborB = i < ps.length - 1 ? ps[i + 1] : ps[0]

                        sum += currentPerson[neighborA]
                        sum += currentPerson[neighborB]
                    }
                }

                return sum
            })
        )
    }
}

const day13 = new Day13()
console.log(day13.solve(input)) // 709
console.log(day13.solve(input, false)) // 709
