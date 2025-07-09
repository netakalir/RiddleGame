import rl from "readline-sync";
import { initPlayer } from "./players.service.js"
import { calcTimes, createRiddleObj, updateRiddleObj } from "../utils/helperFunctions.js";
// import { readRiddles,showAllRiddle,createRiddle,updateRiddle,deleteRiddle } from "./riddles.services.js";
import { Riddle } from "../models/Riddle.js";
import { createRiddle, getAllRiddles, updateRiddle } from "./riddlesService.js";

async function playGame() {
    console.log("Starting the game");
    const riddlesRaw = await getAllRiddles();
    const riddles = riddlesRaw.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer))
    const player = initPlayer()
    for (let i = 0; i < riddles.length; i++) {
        calcTimes(() => riddles[i].ask(), player)
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
    console.log("0. Exit");

    const choice = rl.question("Enter your choice (0-6): ");

    switch (choice) {
        case "1":
            await playGame();//פונקציית עזר שמאתחלת את המשחק וקוראת לפונקציה שמדברת עם השרת
            break;
        case "2":
            const newRiddle = await createRiddleObj();//פונקצית עזר 
            await createRiddle(newRiddle);//פונקציה שמדברת עם השרת
            break;
        case "3":
            const riddles = await getAllRiddles();//אחזור של כל החידות מבסיס הנתונים
            console.log("======all riddles======");
            riddles.forEach(r => console.log(`${r.id}: ${r.taskDescription}`));//הדפסה לקונסול
            break;
        case "4":
            const updated = await updateRiddleObj()//פונקציית עזר 
            await updateRiddle(updated)//פונקציה שמדברת עם השרת
            break;
        case "5":
            await deleteRiddle();//פונקציית עזר שמוחקת חידה על ידי קריאה לפונקציה שמדברת עם השרת
            break;
        case "6":
            await viewLeaderboard();
            break;
        case "0":
            console.log("Goodbye!");
            process.exit();
        default:
            console.log("Invalid choice. please enter a number between 0 and 6.");
    }
    await mainMenu();
}
