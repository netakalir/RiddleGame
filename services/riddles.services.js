import fs from "fs/promises";
import rl from "readline-sync";
import { Riddle } from "../classes/Riddle.js";


//קבלה של כל החידות
export async function getAllRiddle() {
    const response = await fetch("http://localhost:3005/riddles/getAllRiddle")
    return await response.json()
}

//יצרית חידה
export async function createRiddle() {
    const name = rl.question("Enter riddle name:> ");
    const taskDescription = rl.question("Enter task description:> ");
    const correctAnswer = rl.question("Enter correct answer:> ");

    const riddle = { name, taskDescription, correctAnswer };

    const response = await fetch("http://localhost:3005/riddles/createRiddle", {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(riddle)
    });
    const data = await response.json()
    console.log("Riddle created");
}

//עדכון חידה
export async function updateRiddle() {
    const id = rl.question("Enter riddle ID to update:> ");
    const taskDescription = rl.question("Enter new task description:> ");
    const correctAnswer = rl.question("Enter new correct answer:> ");
    const riddle = { taskDescription, correctAnswer };

    const response = await fetch(`http://localhost:3005/riddles/updateRiddle/${id}`,{
        method:"PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riddle)
    })
    const data = await response.json()
    console.log("Riddle updated");
}

//מחיקת חידה
export async function deleteRiddle() {
    const id = rl.question("Enter riddle ID to delete:> ");

    const response = await fetch(`http://localhost:3005/riddles/deleteRiddle/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    console.log("Riddle deleted");
}


