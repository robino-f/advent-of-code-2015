import { readFile } from '../utils/read-file'

const input = readFile('./data/input.txt').split('\n')
const shop = readFile('./data/shop.txt').split('\n')

type Item = {
    name: string
    cost: number
    damage: number
    armor: number
}

class Day21 {
    playerHp = 100
    weapons: Item[] = []
    armors: Item[] = []
    rings: Item[] = []

    initShop(shop: string[]) {
        let type: string = ''

        for (let shopItem of shop) {
            if (shopItem.includes(':')) {
                type = shopItem.split(':')[0]
            } else if (shopItem.length > 0) {
                shopItem = shopItem
                    .replace(/\s+/g, ' ')
                    .replace(/^\s/, '')
                    .replace(/\s$/, '')
                const stats = shopItem.split(' ')
                let name = stats.shift()
                if (type === 'Rings') {
                    name += stats.shift() ?? ''
                }

                let [cost, damage, armor] = stats.map(Number)
                let item = { name: `${type} ${name}`, cost, damage, armor }
                if (type === 'Weapons') {
                    this.weapons.push(item)
                } else if (type === 'Armor') {
                    this.armors.push(item)
                } else if (type === 'Rings') {
                    this.rings.push(item)
                }
            }
        }
    }

    getCombinations(): Item[][] {
        let combinations: Item[][] = this.weapons.map((weapon) => [weapon])

        const combinationsWithArmor = combinations.flatMap((combination) => {
            return this.armors.map((armor) => [...combination, armor])
        })
        combinations = combinations.concat(combinationsWithArmor)

        const combinationsWithOneRing = combinations.flatMap((combination) => {
            return this.rings.map((ring) => [...combination, ring])
        })
        const combinationsWithTwoRing = combinationsWithOneRing.flatMap(
            (combination) => {
                return this.rings.map((ring) =>
                    combination.some((c) => c.name === ring.name)
                        ? [...combination]
                        : [...combination, ring]
                )
            }
        )
        combinations = combinations.concat(combinationsWithOneRing)
        combinations = combinations.concat(combinationsWithTwoRing)

        return combinations
    }

    isWinningFight(
        stuff: Item[],
        bossHp: number,
        bossDamage: number,
        bossArmor: number
    ): boolean {
        let hp = this.playerHp
        let damage = stuff.reduce((acc, item) => acc + item.damage, 0)
        let armor = stuff.reduce((acc, item) => acc + item.armor, 0)

        let currentBossHp = bossHp
        let i = 0

        while (hp > 0 && currentBossHp > 0) {
            if (i % 2 === 0) {
                let attack = damage - bossArmor
                if (attack < 1) attack = 1
                currentBossHp -= attack
            } else {
                let attack = bossDamage - armor
                if (attack < 1) attack = 1
                hp -= attack
            }
            i += 1
        }

        return hp > 0
    }

    solve(value: string[], shop: string[], part1: boolean = true): number {
        if (part1) this.initShop(shop)

        const combinations = this.getCombinations()
        const [bossHp, bossDamage, bossArmor] = value.map((v) =>
            Number(v.split(': ').pop())
        )

        if (part1) {
            return Math.min(
                ...combinations
                    .filter((combination) =>
                        this.isWinningFight(
                            combination,
                            bossHp,
                            bossDamage,
                            bossArmor
                        )
                    )
                    .map((combination) =>
                        combination.reduce((acc, item) => acc + item.cost, 0)
                    )
            )
        }

        return Math.max(
            ...combinations
                .filter(
                    (combination) =>
                        !this.isWinningFight(
                            combination,
                            bossHp,
                            bossDamage,
                            bossArmor
                        )
                )
                .map((combination) =>
                    combination.reduce((acc, item) => acc + item.cost, 0)
                )
        )
    }
}

const day21 = new Day21()
console.log(day21.solve(input, shop)) // 121
console.log(day21.solve(input, shop, false)) // 201
