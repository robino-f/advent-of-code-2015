const createGrid = (value: unknown) =>
    Array(1000)
        .fill(value)
        .map(() => Array(1000).fill(value))

export { createGrid }
