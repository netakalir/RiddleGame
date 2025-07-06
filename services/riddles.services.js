import fs from "fs";
import rl from "readline-sync";
import { Riddle } from "../classes/Riddle.js";
import { error } from "console";


async function showAllRiddle() {
    console.log("======all riddles======");
    try {
        const riddles = await readRiddles()
        console.log(riddles);
    }
    catch (err) {
        console.log("error reading riddles " + err);
    }
}

function readRiddles() {
    return new Promise((res, rej) => {
        fs.readFile("../DB/riddles.txt", "utf-8", ((err, data) => {
            if (err) {
                rej(err);
            }
            res(JSON.parse(data))
        }))
    })
}

async function createRiddle() {
    console.log("Creating a new riddle");

    try {
        const riddles = await readRiddles()
        const id = riddles.length + 1;
        const name = rl.question("insert riddle name:>");
        const taskdescription = rl.question("insert description:>");
        const correctAnswer = rl.question("insert correct answer:>");
        const newRiddle = new Riddle(id, name, taskdescription, correctAnswer)
        riddles.push(newRiddle)

        return new Promise((_res, rej) => {
            fs.writeFile("../DB/riddles.txt", JSON.stringify(riddles), (err) => {
                if (err) {
                    rej("riddel isn't added " + err)
                }
            })
        })

    } catch (error) {
        console.log(error);
    }
}


async function updateRiddle() {
    console.log("Updating an existing riddle");
    try {
        const riddles = await readRiddles()
        return new Promise((res, rej) => {
            const idreddle = rl.question("enter id reddle")
            const riddel = riddles[idreddle]
            const newName = rl.question("insert new riddle name:> ")
            const newTaskdescription = rl.question("insert new task description:> ")
            const newCorrectAnswer = rl.question("insert new correct answer:> ")
            riddel.name = newName;
            riddel.taskDescription = newTaskdescription;
            riddel.correctAnswer = newCorrectAnswer;
            riddles.push(riddel);
            fs.writeFile("../DB/riddles.txt", JSON.stringify(riddles), (err) => {
                if (err) {
                    rej("error:" + err);
                }
            })
        })


    }
    catch (err) {
        console.log(error);
    }

}
// updateRiddle()

async function deleteRiddle() {
    console.log("Deleting a riddle");
    const riddles = await readRiddles()
    try{
        return new Promise((res, rej) => {
        const idreddle = rl.question("enter id reddle:> ")
        riddles.splice(idreddle, 1)
        fs.writeFile("../DB/ridles.txt",JSON.stringify(riddles),(err)=>{
            if(err){
                rej(err);
            }
            else{
                res()
            }
        })
    })
    }
    catch(err){
        console.log(err);
    }
   
}


export {

}