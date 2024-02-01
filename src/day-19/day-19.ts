import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day19 {
    startingMolecule: string = ''
    moleculesMap = new Map<string, string[]>()

    init(values: string[], part1: boolean) {
        this.startingMolecule = values.pop() ?? ''
        values.pop()

        values.map((v) => {
            let [a, b] = v.split(' => ')
            if (!part1) {
                const c = a
                a = b
                b = c
            }
            if (!this.moleculesMap.has(a)) this.moleculesMap.set(a, [b])
            else this.moleculesMap.get(a)?.push(b)
            return [a, b]
        })
    }

    getPossibleReplacements(moleculeToReplace: string): Set<string> {
        const possibleReplacements = new Set<string>()
        let molecule = ''

        for (let i = 0; i < moleculeToReplace.length; i += 1) {
            molecule += moleculeToReplace[i]

            if (
                !Array.from(this.moleculesMap.keys()).some((key) =>
                    key.includes(molecule)
                )
            ) {
                molecule = moleculeToReplace[i]
            }

            if (!this.moleculesMap.has(molecule)) continue
            for (const replacement of this.moleculesMap.get(molecule) ?? []) {
                possibleReplacements.add(
                    `${moleculeToReplace.slice(0, i - molecule.length + 1)}${replacement}${moleculeToReplace.slice(i + 1, moleculeToReplace.length)}`
                )
            }
            molecule = ''
        }

        return possibleReplacements
    }

    solve(values: string[], part1: boolean = true): number {
        this.moleculesMap.clear()
        this.init(values, part1)
        if (part1) {
            return this.getPossibleReplacements(this.startingMolecule).size
        }

        let steps = 0
        let molecule = this.startingMolecule
        const possibleReplacements = Array.from(this.moleculesMap).sort(
            (a, b) => (a[0].length > b[0].length ? -1 : 1)
        )

        while (molecule !== 'e') {
            for (const possibleReplacement of possibleReplacements) {
                if (molecule.includes(possibleReplacement[0])) {
                    molecule = molecule.replace(
                        possibleReplacement[0],
                        possibleReplacement[1][0]
                    )
                    break
                }
            }
            steps += 1
        }

        return steps
    }
}

const day19 = new Day19()
console.log(day19.solve([...input])) // 535
console.log(day19.solve([...input], false)) // 212
