import {Monster} from "./monster";
import {Amazon} from "./player";

const monster = new Monster(500);
const player = new Amazon("Felix");




let exp =monster.getHp();



while(monster.getHp()>0){
    player.switchAttack();
    player.gainExperience(exp);

}


