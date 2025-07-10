import fs from "fs/promises";
import rl from "readline-sync";
import { Riddle } from "../classes/Riddle.js";


//
export async function showAllRiddle() {
    console.log("======all riddles======");
    try {
        const riddles = await readRiddles()
        console.log(riddles);
    }
    catch (err) {
        console.log("error reading riddles " + err);
    }
}

export async function readRiddles() {
    const data = await fs.readFile("./DB/riddles.txt", "utf-8")
    return JSON.parse(data)
}

export async function createRiddle() {
    console.log("Creating a new riddle");

    try {
        const riddles = await readRiddles()
        let id;
        do {
            id = Math.floor(Math.random() * 1000) + 1;
        }
        while (riddles.some(riddle => riddle.id === id));
        const name = rl.question("insert riddle name:>");
        const taskdescription = rl.question("insert description:>");
        const correctAnswer = rl.question("insert correct answer:>");
        const newRiddle = new Riddle(id, name, taskdescription, correctAnswer)
        riddles.push(newRiddle)

        return new Promise((_res, rej) => {
            fs.writeFile("./DB/riddles.txt", JSON.stringify(riddles), (err) => {
                if (err) {
                    rej("riddel isn't added " + err)
                }
            })
        })

    } catch (error) {
        console.log(error);
    }
}


export async function updateRiddle() {
    console.log("Updating an existing riddle");
    try {
        const riddles = await readRiddles()
        return new Promise((res, rej) => {
            const idreddle = rl.question("enter id reddle")
            const riddle = riddles.find(r => r.id == idreddle);
            if (!riddle) {
                console.log("riddle not found");
                res();
                return;
            }
            const newName = rl.question("insert new riddle name:> ")
            const newTaskdescription = rl.question("insert new task description:> ")
            const newCorrectAnswer = rl.question("insert new correct answer:> ")
            riddle.name = newName;
            riddle.taskDescription = newTaskdescription;
            riddle.correctAnswer = newCorrectAnswer;
            fs.writeFile("./DB/riddles.txt", JSON.stringify(riddles, null, 2), (err) => {
                if (err) {
                    rej("error:" + err);
                }
                else {
                    res()
                }
            })
        })
    }
    catch (err) {
        console.log(err);
    }

}


export async function deleteRiddle() {
    console.log("Deleting a riddle");
    const riddles = await readRiddles()
    try {
        return new Promise((res, rej) => {
            const idreddle = rl.question("enter id reddle:> ")
            const riddle = riddles.find(r => r.id == idreddle);
            const index = riddles.findIndex(r => r.id == idreddle);
            if (index === -1) {
                console.log("riddle not found");
                res();
                return;
            }
            riddles.splice(index, 1)
            fs.writeFile("./DB/riddles.txt", JSON.stringify(riddles), (err) => {
                if (err) {
                    rej(err);
                }
                else {
                    res()
                }
            })
        })
    }
    catch (err) {
        console.log(err);
    }

}


