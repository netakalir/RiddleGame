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

export function startRiddleGame() {
    const player = initPlayer()
    
    for(let i = 0; i < riddles.length; i++){
        calcTimes(() => riddles[i].ask(),player)
    }
    player.showStats()
}

function mainMenu() {
    console.log("\n=== Welcome to the Riddle Game ===");
    console.log("What do you want to do?");
    console.log("1. Play the game");
    console.log("2. Create a new riddle");
    console.log("3. Show all riddles");
    console.log("4. Update an existing riddle");
    console.log("5. Delete a riddle");
    console.log("6. View leaderboard");
    console.log("0. Exit");

    const choice = readline.question("Enter your choice (0-6): ");

    switch (choice) {
        case "1":
            playGame();
            break;
        case "2":
            createRiddle();
            break;
        case "3":
            readRiddles();
            break;
        case "4":
            updateRiddle();
            break;
        case "5":
            deleteRiddle();
            break;
        case "6":
            viewLeaderboard();
            break;
        case "0":
            console.log("Goodbye!");
            process.exit();
        default:
            console.log("Invalid choice. Please enter a number between 0 and 6.");
    }
    mainMenu();
}