import {
    createRiddle,
    showAllRiddle,
    updateRiddle,
    deleteRiddle,
    getAllRiddle
} from "../services/riddles.services.js";
import rl from "readline-sync"

export async function userMenu() {
    console.log("\n=== Welcome to the Riddle Game ===");
    console.log("What do you want to do?");
    console.log("1. Play the game");
    console.log("2. Create a new riddle");
    console.log("3. Show all riddles");
    console.log("0. Exit");
    const choice = rl.question("Enter your choice (0-3):> ");

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
        case "0":
            console.log("Goodbye!");
            process.exit();
        default:
            console.log("Invalid choice. please enter a number between 0 and 3.");
    }
    await userMenu();

}

export async function adminMenu() {
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

    const choice = rl.question("Enter your choice (0-7):> ");

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
            console.log("Invalid choice. please enter a number between 0 and 7.");
    }
    await adminMenu();
}