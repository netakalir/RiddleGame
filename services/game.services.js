import rl from "readline-sync";
import {initPlayer} from "players.services.js"
import { calcTimes } from "../utils/helperFunctions.js";
//ייבוא של החידות
import { riddle1 } from "../riddles/r1.js";
import { riddle2 } from "../riddles/r2.js";
//שמירה של החידות לתוך מערך
const riddles = [riddle1, riddle2];

export function playGame() {
    console.log("Starting the game");
    const player = initPlayer()
    for (let i = 0; i < riddles.length; i++) {
        calcTimes(() => riddles[i].ask(), player)
    }
    player.showStats()
}


export function mainMenu() {
    console.log("\n=== Welcome to the Riddle Game ===");
    console.log("What do you want to do?");
    console.log("1. Play the game");
    console.log("2. Create a new riddle");
    console.log("3. Show all riddles");
    console.log("4. Update an existing riddle");
    console.log("5. Delete a riddle");
    console.log("6. View leaderboard");
    console.log("0. Exit");

    const choice = rl.question("Enter your choice (0-6): ");

    switch (choice) {
        case "1":
            playGame();
            break;
        case "2":
            createRiddle();
            break;
        case "3":
            showAllRiddle();
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
            console.log("Invalid choice. please enter a number between 0 and 6.");
    }
    mainMenu();
}
