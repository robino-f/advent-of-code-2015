const fs = require('node:fs')

const readFile = (path: string) => fs.readFileSync(path, 'utf8')

export { readFile }
