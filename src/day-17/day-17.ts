import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day17 {
    getCombinations(
        containers: { value: number; i: number }[],
        litters: number = 0,
        currentLitters: number = 0,
        combination: { value: number; i: number }[] = []
    ): string[] {
        if (currentLitters === litters)
            return [
                combination
                    .sort((a, b) => (a.i > b.i ? 1 : -1))
                    .map((c) => `${c.value}(${c.i})`)
                    .join(','),
            ]
        if (currentLitters > litters || containers.length === 0) return []

        return containers.flatMap((container) => {
            return this.getCombinations(
                containers.filter((c) => c !== container),
                litters,
                currentLitters + container.value,
                [...combination, container]
            )
        })
    }

    solve(values: string[], litters: number, part1: boolean = true): number {
        const combinations = new Set(
            this.getCombinations(
                values.map((v, i) => ({ value: Number(v), i })),
                litters
            )
        )
        if (part1) return combinations.size

        let minContainersNumberCombinations = 0
        const minContainers = Array.from(combinations)
            .map((c) => [...c.matchAll(/,/g)].length)
            .sort()
        const minContainerNumber = minContainers[0]
        for (const minContainer of minContainers) {
            if (minContainer === minContainerNumber) {
                minContainersNumberCombinations += 1
            } else {
                break
            }
        }

        return minContainersNumberCombinations
    }
}

const day17 = new Day17()
console.log(day17.solve(input, 150)) // 654
console.log(day17.solve(input, 150, false)) // 57
