import rl from "readline-sync";


export async function getAllRiddle() {//get all riddles by requesting from the server
    const response = await fetch("http://localhost:3005/riddles/getAllRiddle")
    return await response.json()
}

export async function showAllRiddle() {//show all riddles by requesting from the server
    const res = await fetch("http://localhost:3005/riddles/getAllRiddle");
    const response = await res.json();
    console.log("\n--- All Riddles ---");
    response.riddles.forEach((riddle, i) => {
        console.log(`\nRiddle #${i + 1}`);
        // console.log(`ID: ${riddle.id}`);todo
        console.log(`Name: ${riddle.name}`);
        console.log(`Description: ${riddle.taskDescription}`);
        console.log(`Answer: ${riddle.correctAnswer}`);
    });
}

export async function createRiddle() {//create riddle by requesting from the server
    const name = rl.question("Enter riddle name:> ");
    const taskDescription = rl.question("Enter task description:> ");
    const correctAnswer = rl.question("Enter correct answer:> ");

    const riddle = { name, taskDescription, correctAnswer };

    const response = await fetch("http://localhost:3005/riddles/createRiddle", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(riddle)
    });
    const data = await response.json()
    console.log("Riddle created");
}

export async function updateRiddle() {//update riddle by requesting from the server
    const id = rl.question("Enter riddle ID to update:> ");
    const name = rl.question("Enter new name:> ");
    const taskDescription = rl.question("Enter new task description:> ");
    const correctAnswer = rl.question("Enter new correct answer:> ");

    const riddle = { name, taskDescription, correctAnswer };

    const response = await fetch(`http://localhost:3005/riddles/updateRiddle/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riddle)
    })
    const data = await response.json()
    console.log("Riddle updated");
}

export async function deleteRiddle() {//delete riddle by requesting from the server
    const id = rl.question("Enter riddle ID to delete:> ");

    const response = await fetch(`/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    console.log("Riddle deleted");
}


