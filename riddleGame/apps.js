import rl from "readline-sync";
import { Player } from "../classes/Player.js";
//ייבוא של החידות
import { riddle1 } from "../riddles/r1.js";
import { riddle2 } from "../riddles/r2.js";
//שמירה של החידות לתוך מערך
const riddles = [riddle1, riddle2];


function sayHello(){
    console.log("-----welcome to the riddle game-----")
    const name = rl.question("-------what is your name?-----")
    console.log(`--------hello ${name}--------`)
    return name;
}

function initPlayer(){
   const player = new Player(sayHello());
   return player;
}

function calcTimes(cb,player){
    const start = Date.now();
    cb()
    const end = Date.now();
    const seconds = Math.floor((end - start)/1000);
    player.recordTime(seconds)
}

function startRiddleGame() {
    const player = initPlayer()
    
    for(let i = 0; i < riddles.length; i++){
        calcTimes(() => riddles[i].ask(),player)
    }
    player.showStats()
}

startRiddleGame()