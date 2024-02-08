class Day25 {
    row = 3019
    column = 3010

    firstCode = 20151125
    base = 252533
    mod = 33554393

    solve(): number {
        let x = 1
        let y = 1
        let val = this.firstCode
        let solution

        while (!solution) {
            if (y === 1) {
                y = x + 1
                x = 1
            } else {
                y -= 1
                x += 1
            }
            val = (val * this.base) % this.mod

            if (x === this.row && y === this.column) {
                solution = val
            }
        }

        return solution
    }
}

const day25 = new Day25()
console.log(day25.solve()) // 8997277
