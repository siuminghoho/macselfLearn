import { Monster } from "./monster";
import { Player } from "./player";

const monster = new Monster(400);
const player = new Player(20, "Peter");

let exp = monster.getHp();

while (monster.getHp() > 0) {
    player.attack(monster);
}
if (monster.getHp() === 0) {
    player.gainExperience(exp);
}

console.log(
    "player after defeat boss,the strength grow to",
    player.getStrength()
)



