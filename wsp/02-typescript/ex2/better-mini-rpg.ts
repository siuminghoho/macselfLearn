<<<<<<< HEAD
import{Monster} from './monster';
import{Amazon} from './player';
=======
import {Monster} from "./monster";
import {Amazon} from "./player";

const monster = new Monster(500);
const player = new Amazon("Felix");




let exp =monster.getHp();



while(monster.getHp()>0){
    player.switchAttack();
    player.gainExperience(exp);

}


>>>>>>> 736186c41f420defbfa226f90e4763623da2e90a
