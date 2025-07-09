import rl from "readline-sync"

export function calcTimes(cb, player) {
    const start = Date.now();
    cb()
    const end = Date.now();
    const seconds = Math.floor((end - start) / 1000);
    player.recordTime(seconds)
}

export function sayHello() {//פונקציית עזר לקבלת שם השחקן בצד לקוח
    console.log("-----welcome to the riddle game-----")
    const name = rl.question("-------what is your name?-----")
    console.log(`--------hello ${name}--------`)
    return name;
}
export async function createRiddleObj() {//פונקציית עזר שמייצרת חידה בצד לקוח ומחזירה אותה
    const name = rl.question("insert riddle name:>");
    const taskdescription = rl.question("insert description:>");
    const correctAnswer = rl.question("insert correct answer:>");
    const newRiddle = new Riddle( name, taskdescription, correctAnswer);
    return newRiddle;
}

export async function updateRiddleObj(){//פונקציית עזר שמעדכנת חידה בצד לקוח ומחזירה את החידה המעודנת
    const taskdescription = rl.question("Enter the new riddle question:");
    const correctAnswer = rl.question("Enter the new riddle answer:");
    const updated = {
        id,
        taskdescription,
        correctAnswer
    };
    return updated
}

export async function deleteRiddle(){//פןנקצית עזר שקוראת לפונקציה שמדברת עם השרת בשביל למחוק חידה לפי מזהה יחודי
    const id = rl.question("Enter the ID of the riddle you want to delete:> ");
    const result = await deleteRiddleFromServer(id);
    if (result) {
        console.log("deletion process complete.");
    }else{
        console.log("deletion failed");
    }
}