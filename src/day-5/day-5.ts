import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

class Day5 {
    isNicePart1(value: string): boolean {
        const hasThreeVowels = Boolean(
            value.match(/.*[aeiou].*[aeiou].*[aeiou].*/)
        )
        if (!hasThreeVowels) return false

        const hasDoubleLetter = Boolean(value.match(/(.)\1/))
        if (!hasDoubleLetter) return false

        const hasDisallowedSubstrings = Boolean(value.match(/ab|cd|pq|xy/))
        if (hasDisallowedSubstrings) return false

        return true
    }

    solvePart1(values: [string]): number {
        return values.filter(this.isNicePart1).length
    }

    isNicePart2(value: string): boolean {
        const hasDoubleLettersPair = Boolean(value.match(/(\w{2}).*?(\1)/))
        if (!hasDoubleLettersPair) return false

        let hasPalindrome = false
        for (let i = 0; i < value.length - 2; i += 1) {
            if (value.slice(i, i + 2) === `${value[i + 2]}${value[i + 1]}`) {
                hasPalindrome = true
                break
            }
        }
        return hasPalindrome
    }

    solvePart2(values: [string]): number {
        return values.filter(this.isNicePart2).length
    }
}

const day5 = new Day5()
console.log(day5.solvePart1(input)) // 255
console.log(day5.solvePart2(input)) // 55
