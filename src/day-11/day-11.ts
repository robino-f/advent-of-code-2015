import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt')

class Day11 {
    isValid(password: string): boolean {
        let hasThreeIncreasingLetters = false;
        for (let i = 0; i <= password.length - 3; i += 1) {
            const letters = [
                password.charCodeAt(i),
                password.charCodeAt(i + 1),
                password.charCodeAt(i + 2)
            ]
            if ((letters[1] - letters[0] === 1) && letters[2] - letters[1] === 1) {
                hasThreeIncreasingLetters = true;
                break;
            }
        }

        if (!hasThreeIncreasingLetters) return false;


        if (password.match(/i|o|l/)) return false;

        const firstDoubledLetter = password.match(/(.)\1/)?.[1]
        if (!firstDoubledLetter) return false
        const secondDoubleLetter = password.match(new RegExp(`([^${firstDoubledLetter}])\\1`))
        if (!secondDoubleLetter) return false

        return true
    }

    incrementPassword(password: string): string {
        let increment = ''
        for (let i = password.length - 1; i >= 0; i -= 1) {
            const char = password[i]
            const nextChar = char !== 'z' ? String.fromCharCode(char.charCodeAt(0) + 1) : 'a';
            increment = `${nextChar}${increment}`
            if (char !== 'z') break;
        }

        return `${password.slice(0, password.length - increment.length)}${increment}`
    }

    solve(value: string): string {
        let nextPassword = value;
        let isValid = false

        while (!isValid) {
            nextPassword = this.incrementPassword(nextPassword)
            isValid = this.isValid(nextPassword)
        }

        return nextPassword
    }
}

const day11 = new Day11()
const nextPassword = day11.solve(input)
console.log(nextPassword) // hepxxyzz
console.log(day11.solve(nextPassword)) // heqaabcc
