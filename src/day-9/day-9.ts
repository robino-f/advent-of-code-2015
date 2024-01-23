import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day9 {
    distancesMap = new Map<string, { [k: string]: number }>()

    getShortestPath(
        destinations: string[],
        currentDestination: string = '',
        distance: number = 0
    ): number {
        if (destinations.length === 0) return distance

        return Math.min(
            ...destinations.map((destination) => {
                const nextDestinations = destinations.filter(
                    (dest) => dest !== destination
                )

                if (currentDestination === '') {
                    return this.getShortestPath(
                        nextDestinations,
                        destination,
                        distance
                    )
                } else {
                    const nextValue =
                        this.distancesMap.get(currentDestination)?.[
                            destination
                        ] ?? 0
                    return this.getShortestPath(
                        nextDestinations,
                        destination,
                        distance + nextValue
                    )
                }
            })
        )
    }

    solvePart1(lines: string[]): number {
        for (const line of lines) {
            const [positions, distance] = line.split(' = ')
            const [A, B] = positions.split(' to ')

            if (!this.distancesMap.has(A)) this.distancesMap.set(A, {})
            if (!this.distancesMap.has(B)) this.distancesMap.set(B, {})

            const distanceValue = Number(distance)
            let mapItem = this.distancesMap.get(A) ?? {}
            mapItem[B] = distanceValue
            mapItem = this.distancesMap.get(B) ?? {}
            mapItem[A] = distanceValue
        }

        return this.getShortestPath(Array.from(this.distancesMap.keys()))
    }

    getLongestPath(
        destinations: string[],
        currentDestination: string = '',
        distance: number = 0
    ): number {
        if (destinations.length === 0) return distance

        return Math.max(
            ...destinations.map((destination) => {
                const nextDestinations = destinations.filter(
                    (dest) => dest !== destination
                )

                if (currentDestination === '') {
                    return this.getLongestPath(
                        nextDestinations,
                        destination,
                        distance
                    )
                } else {
                    const nextValue =
                        this.distancesMap.get(currentDestination)?.[
                            destination
                        ] ?? 0
                    return this.getLongestPath(
                        nextDestinations,
                        destination,
                        distance + nextValue
                    )
                }
            })
        )
    }

    solvePart2(): number {
        return this.getLongestPath(Array.from(this.distancesMap.keys()))
    }
}

const day9 = new Day9()
console.log(day9.solvePart1(input)) // 117
console.log(day9.solvePart2()) // 909
