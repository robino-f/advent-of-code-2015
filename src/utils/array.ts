const createGrid = (value: unknown, x: number = 1000, y: number = 1000) =>
    Array(y)
        .fill(value)
        .map(() => Array(x).fill(value))

export { createGrid }
