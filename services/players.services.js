import { Player } from "../classes/Player.js";



export async function getUser(playerName) {//ask from server get all players
    try {
        const response = await fetch(`http://localhost:3005/players/getPlayer/${playerName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName })
        });
        if (!response.ok) throw new Error("Player not found on server");
        const data = await response.json();
        return new Player(data.newPlayer);
    } catch (error) {
        console.error("Failed to fetch player:", error);
        throw error; 
    }
}

export async function recordTime(id, seconds) {//calculate time for each riddla
    try {
        const response = await fetch(`http://localhost:3005/players/${id}/recordTime`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ times: seconds })
        });
        if (!response.ok) {
            throw new Error("Server returned " + response.status);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to record time:", error);
        throw error;
    }
}

export async function showAllPlayers() {//show all players
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

export async function viewLeaderboard() {//get the player thet time`s is less
    try {
        const res = await fetch("http://localhost:3005/players/getBestPlayer",{
            method:"GET",
            headers:{ "Content-Type": "application/json" }
        });
        console.log(await res.json())

    } catch (error) {
        console.error(error);
    }
}