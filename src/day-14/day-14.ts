import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day14 {
    reindeers = new Map<
        string,
        { speed: number; duration: number; rest: number }
    >()

    initReindeers(values: string[]) {
        for (const reindeer of values) {
            const [name, , , speed, , , duration, , , , , , , rest] =
                reindeer.split(' ')

            this.reindeers.set(name, {
                speed: Number(speed),
                duration: Number(duration),
                rest: Number(rest),
            })
        }
    }

    getMaxDistance(seconds: number) {
        let maxDistance = 0
        let reindeerName = ''
        for (const entry of Array.from(this.reindeers.entries())) {
            const cycleDuration = entry[1].duration + entry[1].rest
            const completeCycles = Math.floor(seconds / cycleDuration)
            const distancePerCycle = entry[1].duration * entry[1].speed
            let distance = completeCycles * distancePerCycle

            const incompleteCycle = seconds % cycleDuration
            if (incompleteCycle >= entry[1].duration) {
                distance += distancePerCycle
            } else {
                distance += incompleteCycle * entry[1].speed
            }

            if (distance > maxDistance) {
                maxDistance = distance
                reindeerName = entry[0]
            }
        }

        return { maxDistance, reindeerName }
    }

    solvePart1(values: string[], seconds: number): number {
        this.initReindeers(values)
        return this.getMaxDistance(seconds).maxDistance
    }

    solvePart2(seconds: number): number {
        const reindeersPoints = new Map<string, number>(
            Array.from(this.reindeers.keys()).map((name) => [name, 0])
        )

        for (let i = 1; i <= seconds; i += 1) {
            let { reindeerName } = this.getMaxDistance(i)

            reindeersPoints.set(
                reindeerName,
                (reindeersPoints.get(reindeerName) ?? 0) + 1
            )
        }

        return Math.max(...Array.from(reindeersPoints.values()))
    }
}

const day14 = new Day14()
console.log(day14.solvePart1(input, 2503)) // 2696
console.log(day14.solvePart2(2503)) // 1084
