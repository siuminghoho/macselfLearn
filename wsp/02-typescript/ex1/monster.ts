export class Monster {
    private hp: number;
    constructor(hpInput?: number) {
        if (hpInput) {
            this.hp = hpInput;
        } else {
            this.hp = 100;
        }
    }
    injure(damage: number) {
        this.hp -= damage;

        if (this.hp < 0) {
            this.hp = 0;
            return
        }
       
    }

    getHp(){
        return this.hp;
    }

}