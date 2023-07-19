import { Monster } from "./monster";

export class Player {
    private strength: number;
    private name: string;

    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
    }
    attack(monster: Monster) {
        console.log("get player's base strength: " + this.strength);
        if (Math.random() > 0.5) {
            monster.injure(this.strength * 2);
            console.log(`Player ${this.name} attacks monster (HP: ${monster.getHp()})[CRITICAL]`);




        } else {
            monster.injure(this.strength);
            console.log(`Player ${this.name} attacks monster (HP: ${monster.getHp()})`);


        };






    }


    gainExperience(exp: number) {

        this.strength += exp;
    }


    getStrength() {
        return this.strength;
    }
}