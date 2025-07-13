import rl from "readline-sync";
import { getUser, showAllPlayers, } from "../services/players.services.js"
import { recordTime } from "../services/players.services.js";
import { calcTimes, sayHello } from "../utils/helperFunctions.js";
import { Riddle } from "../classes/Riddle.js";
import { Player } from "../classes/Player.js";
import {
  createRiddle,
  showAllRiddle,
  updateRiddle,
  deleteRiddle,
  getAllRiddle
} from "./riddles.services.js";


async function playGame() {
    console.log("Starting the game");
    const data = await getAllRiddle()
    const riddles = data.riddles.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer))
    const player = await getUser(sayHello())
    for (let i = 0; i < riddles.length; i++) {
        await calcTimes(
            () => riddles[i].ask(),
            async (seconds) =>{
                player.recordTime(seconds)//שמירה לוקלאית לצורך חישובים והצגת סטיסטיקה
                await recordTime(player.id,seconds)// שליחה לשרת על ידי פונקציה שקיימת אצלו
            }
        )
    }
    player.showStats()
}


export async function mainMenu() {
    console.log("\n=== Welcome to the Riddle Game ===");
    console.log("What do you want to do?");
    console.log("1. Play the game");
    console.log("2. Create a new riddle");
    console.log("3. Show all riddles");
    console.log("4. Update an existing riddle");
    console.log("5. Delete a riddle");
    console.log("6. View leaderboard");
    console.log("7. Show all players")
    console.log("0. Exit");

    const choice = rl.question("Enter your choice (0-6):> ");

    switch (choice) {
        case "1":
            await playGame();
            break;
        case "2":
            await createRiddle();
            break;
        case "3":
            await showAllRiddle();
            break;
        case "4":
            await updateRiddle();
            break;
        case "5":
            await deleteRiddle();
            break;
        case "6":
            await viewLeaderboard();
            break;
        case "7":
            await showAllPlayers()
            break;
        case "0":
            console.log("Goodbye!");
            process.exit();
        default:
            console.log("Invalid choice. please enter a number between 0 and 6.");
    }
    await mainMenu();
}
