import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')

type Spell = {
    name: string
    cost: number
    damage: number
    heal: number
    armor?: number
    mana?: number
    duration?: number
}

class Day22 {
    spells: Spell[] = [
        {
            name: 'Magic Missile',
            cost: 53,
            damage: 4,
            heal: 0,
        },
        {
            name: 'Drain',
            cost: 73,
            damage: 2,
            heal: 2,
        },
        {
            name: 'Shield',
            cost: 113,
            damage: 0,
            heal: 0,
            duration: 6,
            armor: 7,
        },
        {
            name: 'Poison',
            cost: 173,
            damage: 3,
            heal: 0,
            duration: 6,
            armor: 0,
        },
        {
            name: 'Recharge',
            cost: 229,
            damage: 0,
            heal: 0,
            duration: 5,
            armor: 0,
            mana: 101,
        },
    ]
    startingHp = 50
    startingMana = 500
    bossHp = 58
    bossDamage = 9
    minCost = 1_000_000

    applyEffects(spellsUsed: Spell[]) {
        const effects = {
            armor: 0,
            damage: 0,
            mana: 0,
            heal: 0,
        }

        for (const spell of spellsUsed) {
            if (spell.duration) {
                spell.duration -= 1
                if (spell.duration > 0) {
                    effects.armor += spell.armor ?? 0
                    effects.damage += spell.damage ?? 0
                    effects.mana += spell.mana ?? 0
                }
            }
        }

        return effects
    }

    getCombinations(
        part1: boolean = true,
        spellsUsed: Spell[] = [],
        remainingMana: number = this.startingMana,
        remainingHp: number = this.startingHp,
        remainingBossHp: number = this.bossHp,
        turn: number = 0
    ): number[] {
        const effects = this.applyEffects(spellsUsed)
        if (!part1 && turn % 2 === 0) effects.heal -= 1
        const totalCost = spellsUsed.reduce((acc, spell) => acc + spell.cost, 0)

        if (remainingHp + effects.heal < 1 || totalCost > this.minCost) {
            return []
        } else if (remainingBossHp - effects.damage < 1) {
            if (totalCost < this.minCost) {
                this.minCost = totalCost
            }

            return [totalCost]
        }

        if (turn % 2 === 0) {
            const playableSpells = this.spells.filter(({ cost, name }) => {
                if (cost > remainingMana + effects.mana) return false
                return !spellsUsed.some(
                    (spell) => spell.name === name && spell.duration
                )
            })

            const combinations = playableSpells.flatMap((spell) => {
                let nextSpells = [
                    ...spellsUsed.map((s) => ({ ...s })),
                    { ...spell },
                ]
                let nextMana = remainingMana - spell.cost + effects.mana
                let nextHp = remainingHp + effects.heal
                let nextBossHp = remainingBossHp - effects.damage - spell.damage

                if (!spell.duration) {
                    nextHp += spell.heal
                } else {
                    nextMana += spell.mana ?? 0
                }

                return this.getCombinations(
                    part1,
                    nextSpells,
                    nextMana,
                    nextHp,
                    nextBossHp,
                    turn + 1
                )
            })

            if (combinations.length === 0) {
                return []
            }

            return combinations
        } else {
            let attack = this.bossDamage - effects.armor
            if (attack < 1) attack = 1
            let nextHp = remainingHp - attack
            let nextBossHp = remainingBossHp - effects.damage

            return this.getCombinations(
                part1,
                spellsUsed,
                remainingMana + effects.mana,
                nextHp,
                nextBossHp,
                turn + 1
            )
        }
    }

    solve(part1: boolean = true): number {
        this.minCost = 1_000_000
        return Math.min(...this.getCombinations(part1))
    }
}

const day22 = new Day22()
console.log(day22.solve()) // 1269
console.log(day22.solve(false)) // 1309
