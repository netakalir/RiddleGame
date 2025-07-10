import { Player } from "../classes/Player.js";
import fs from "fs"
import rl from "readline-sync"
import { genretId } from "../utils/helperFunctions.js";

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
    const players = await readPlayers()
    const playerInDB = players.find(p => p.name === playerName)
    if (playerInDB) {
        const player = new Player(playerInDB)
        return player
    }
    else {
        console.log("Creating a new player");
        const id = genretId()
        const newplayer = new Player({ id, name: playerName });
        players.push(newplayer);
        return new Promise((res, rej) => {
            fs.writeFile("./DB/players.txt", JSON.stringify(players), (err) => {
                if (err) {
                    rej("player isn't added " + err)
                }
                res(newplayer)
            })
        })
    }
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



