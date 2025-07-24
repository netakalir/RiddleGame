import { Player } from "../classes/Player.js";



export async function getUser(player) {//ask from server get all players
    try {
        const response = await fetch(`http://localhost:3005/players/getPlayer/${player.name}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: player.name, password: player.password })
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

    console.log("\n╔══════════════════════════════════════════════════════════╗");
    console.log("║                    🎮 ALL PLAYERS 🎮                     ║");
    console.log("╚══════════════════════════════════════════════════════════╝\n");

    if (players.players.length === 0) {
        console.log("                   No players found! 😢\n");
        return;
    }

    players.players.forEach((player, i) => {
        console.log("┌─────────────────────────────────────────────────────────┐");
        console.log(`│ 🏆 Player #${(i + 1).toString().padStart(2, '0')}                                        │`);
        console.log("├─────────────────────────────────────────────────────────┤");
        console.log(`│ 👤 Name: ${player.name.padEnd(45, ' ')} │`);
        console.log(`│ 🆔 ID: ${player.id.toString().padEnd(47, ' ')} │`);
        const timesStr = player.times && player.times.length > 0 ?
            player.times.join("s, ") + "s" : "No times recorded";
        console.log(`│ ⏱️  Times: ${timesStr.padEnd(43, ' ')} │`);
        console.log("└─────────────────────────────────────────────────────────┘\n");
    });
}

export async function viewLeaderboard() {//get the player thet time`s is less
    try {
        const res = await fetch("http://localhost:3005/players/getBestPlayer", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const leaderboardData = await res.json();

        console.log("\n╔══════════════════════════════════════════════════════════╗");
        console.log("║                  🏆 LEADERBOARD 🏆                       ║");
        console.log("╚══════════════════════════════════════════════════════════╝\n");

        if (leaderboardData.msg) {
            console.log("┌─────────────────────────────────────────────────────────┐");
            console.log("│                    🎯 RESULTS 🎯                        │");
            console.log("├─────────────────────────────────────────────────────────┤");
            console.log(`│ ${leaderboardData.msg.padEnd(55, ' ')} │`);
            console.log("└─────────────────────────────────────────────────────────┘\n");
        }

        if (leaderboardData.data) {
            const lines = leaderboardData.data.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    console.log(`📊 ${line}`);
                }
            });
            console.log("");
        }

    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
    }
}