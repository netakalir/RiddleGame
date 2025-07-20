import { Player } from "../classes/Player.js";
import rl from "readline-sync"


export function readPlayers() {
    return new Promise((res, rej) => {
        fs.readFile("./DB/players.txt", "utf-8", ((err, data) => {
            if (err) {
                rej(err);
            }
            res(JSON.parse(data))
        }))
    })
}

export async function getUser(playerName) {
    const response = await fetch(`http://localhost:3005/players/getPlayer/${playerName}`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name:playerName })
    })
    if (!response.ok) throw new Error("Player not found on server");
    const data = await response.json()
    return new Player(data.newPlayer)
}

export async function recordTime(id, seconds) {
    await fetch(`http://localhost:3005/players/${id}/recordTime`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ times:seconds })
    })
}

export async function showAllPlayers() {
    const res = await fetch("http://localhost:3005/players/getAllPlayers");
    const players = await res.json();

    console.log("\n--- All Players ---");
    players.players.forEach((player, i) => {
        console.log(`\nPlayer #${i + 1}`);
        console.log(`ID: ${player.id}`);
        console.log(`Name: ${player.name}`);
        console.log(`Times: ${player.times.join(", ") || "None"}`);
    });
}



