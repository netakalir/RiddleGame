import { Player } from "../classes/Player.js";
import fs from "fs"
import rl from "readline-sync"
import { sayHello } from "../utils/helperFunctions.js";

export function initPlayer() {
    const player = new Player(sayHello());
    return player;
}


async function showAllPlayers() {
    console.log("======all players======");
    try {
        const players = await readPlayers()
        console.log(players);
    }
    catch (err) {
        console.log("error reading players " + err);
    }
}

function readPlayers() {
    return new Promise((res, rej) => {
        fs.readFile("../DB/players.txt", "utf-8", ((err, data) => {
            if (err) {
                rej(err);
            }
            res(JSON.parse(data))
        }))
    })
}

async function createPlayer() {
    console.log("Creating a new player");
    const players = await readPlayers()
    try {
        let id;
        do {
            id = Math.floor(Math.random() * 1000) + 1;
        }
        while (players.some(player => player.id === id));

        const name = rl.question("insert player name:>");
        const newplayer = new Player(id, name);
        players.push(newplayer);

        return new Promise((_res, rej) => {
            fs.writeFile("../DB/players.txt", JSON.stringify(players), (err) => {
                if (err) {
                    rej("player isn't added " + err)
                }
            })
        })

    } catch (error) {
        console.log(error);
    }
}


async function updatePlayer() {
    console.log("Updating an existing player");
    try {
        const players = await readPlayers()
        return new Promise((res, rej) => {
            const idPlayer = rl.question("enter id player")
            const player = players.find(p => p.id == idPlayer)
            if (!player) {
                console.log("player not found");
                return;
            }
            const newName = rl.question("insert new player name:> ");
            player.name = newName;
            fs.writeFile("../DB/players.txt", JSON.stringify(players), (err) => {
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


async function deleteplayer() {
    console.log("Deleting a player");
    const players = await readPlayers()
    try {
        return new Promise((res, rej) => {
            const idPlayer = rl.question("enter id player:> ")
            const index = players.findIndex(p => p.id == idPlayer);
            if (index === -1) {
                console.log("player not found");
                res();

            }
            players.splice(index, 1);
            fs.writeFile("../DB/players.txt", JSON.stringify(players), (err) => {
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
// createPlayer()
// showAllPlayers()

async function showAllPlayersWithLowestTime() {
    try {
        const playersRaw = await readPlayers();
        const players = playersRaw.map(p => {
            const player = new Player(p.id, p.name)
            player.times = p.times || []
            return player
        })
        players.forEach(player => {
            console.log(`Player: ${player.name}, Lowest Time: ${player.getLowestTimes()}`);
        })
    } catch (error) {
        console.log(error);
    }

}


// function viewLeaderboard() {
//     console.log("Viewing the leaderboard");

// }todo