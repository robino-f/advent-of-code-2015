import { readFile } from '../utils/read-file'
import { createGrid } from '../utils/array'

const input = readFile('./data/input.txt').split('\n')

class Day18 {
    getNeighboursOn(grid: boolean[][], x: number, y: number): number {
        const neighbours = [
            [x - 1, y - 1],
            [x - 1, y],
            [x - 1, y + 1],
            [x, y - 1],
            [x, y + 1],
            [x + 1, y - 1],
            [x + 1, y],
            [x + 1, y + 1],
        ]

        return neighbours
            .map((coordinates) => grid[coordinates[1]]?.[coordinates[0]])
            .filter((neighbour) => neighbour).length
    }

    turnCornersOn(grid: boolean[][]) {
        grid[0][0] = true
        grid[0][grid[0].length - 1] = true
        grid[grid.length - 1][0] = true
        grid[grid.length - 1][grid[0].length - 1] = true
    }

    getNextGrid(grid: boolean[][], part1: boolean): boolean[][] {
        const nextGrid = createGrid(false, grid[0].length, grid.length)

        for (let y = 0; y < grid.length; y += 1) {
            for (let x = 0; x < grid[0].length; x += 1) {
                const neighbours = this.getNeighboursOn(grid, x, y)
                const light = grid[y][x]

                if (light) {
                    nextGrid[y][x] = neighbours === 2 || neighbours === 3
                } else {
                    nextGrid[y][x] = neighbours === 3
                }
            }
        }

        if (!part1) {
            this.turnCornersOn(nextGrid)
        }

        return nextGrid
    }

    solve(values: string[], steps: number, part1: boolean = true): number {
        const grid = values.map((v) =>
            v.split('').map((c) => (c === '#' ? true : false))
        )
        if (!part1) {
            this.turnCornersOn(grid)
        }

        let nextGrid = grid
        for (let i = 0; i < steps; i += 1) {
            nextGrid = this.getNextGrid(nextGrid, part1)
        }

        return nextGrid.flat().filter((v) => v).length
    }
}

const day18 = new Day18()
console.log(day18.solve(input, 100)) // 1061
console.log(day18.solve(input, 100, false)) // 1006
