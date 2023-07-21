import {
    Attack,
    BowAndArrows,
    ThrowingSpears,
    Swords,
    MagicSpells,
} from "./attack";

import { Monster } from "./monster";


export interface Player {
    attack(monster: Monster): void;
    switchAttack(): void;
    gainExperience(exp: number): void;
}

let levelUpRequirement = [400, 850, 1000, 2000, 5000];

export class Amazon implements Player {
    private name: string;
    private level: number;
    private experience: number;
    private primary: Attack;
    private secondary: Attack;
    private usePrimaryAttack: boolean;


    constructor(nameInput: string) {
        this.name = nameInput;
        this.level = 0;
        this.experience = 0;
        this.primary = new BowAndArrows(30);
        this.secondary = new ThrowingSpears(40);
        //TODO:set the default value of usePrimaryAttack
        this.usePrimaryAttack = true;
    }


    attack(monster: Monster): void {
        if (this.usePrimaryAttack) {
            //TODO:use primary attach
            let damage = this.primary.damage * (1 + (this.level + 1) / 10);
            monster.injure(damage);

            console.log(
                `Player ${this.name} attacks monster with primary ${this.primary.name} dealing damage of ${damage}
                Monster has${monster.getHp()} HP left.`)


        }


        else {
            //Secondary attack
            let damage = this.secondary.damage * (1 + (this.level + 1) / 10);
            monster.injure(damage);

            console.log(
                `Player ${this.name} attack monster with secondary${this.secondary.name
                } dealing damage of ${damage}
             Monster has ${monster.getHp()} HP left.`
            )
        }

    }




    switchAttack() {
        //TODO:Change the attack mode for this player
        this.usePrimaryAttack = !this.usePrimaryAttack;
        if (this.usePrimaryAttack) {
            console.log(`Player ${this.name} switches to primary attack ${this.primary.name}`);

        }
    }

    gainExperience(exp: number) {
        this.experience += exp;

        if (this.experience > levelUpRequirement[this.level]) {
            this.experience = this.experience - levelUpRequirement[this.level];
            this.level += 1;
            console.log(
                `Player ${this.name}  level up!!! From lv${this.level - 1} to lv${this.level}} with ${this.experience} exp left. The next level requirement is ${levelUpRequirement[this.level]
                }`
            )
        }
    }
}