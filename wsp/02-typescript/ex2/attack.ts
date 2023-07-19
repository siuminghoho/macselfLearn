export interface Attack {

    damage: number;
    name: string;

}

export class BowAndArrows implements Attack {
    damage: number;
    name: string;

    constructor(damageInput: number) {
        this.damage = damageInput;
        this.name = "Bow and Arrows";
    }

}


export class ThrowingSpears implements Attack {
    damage: number;
    name: string;

    constructor(damageInput: number) {
        this.damage = damageInput;
        this.name = "Throwing Spears";
    }

}


export class Swords implements Attack {
    damage: number;
    name: string;

    constructor(damageInput: number) {
        this.damage = damageInput;
        this.name = "Sword";
    }

}

export class MagicSpells implements Attack {
    damage: number;
    name: string;

    constructor(damageInput: number) {
        this.damage = damageInput;
        this.name = "Magic Spells";
    }

}