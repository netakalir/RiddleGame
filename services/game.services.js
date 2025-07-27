import { getPlayerByName, showAllPlayers, } from "../services/players.services.js"
import { recordTime, viewLeaderboard } from "../services/players.services.js";
import { calcTimes, sayHello, enter } from "../utils/helperFunctions.js";
import { getAllRiddle } from "./riddles.services.js";
import { Riddle } from "../classes/Riddle.js";
import { Player } from "../classes/Player.js";


export async function playGame(playerName) {
    try {
        const data = await getAllRiddle()
        const riddles = data.riddles
        const riddlesArray = riddles.map(r => new Riddle(r.id, r.name, r.taskDescription, r.correctAnswer));
        const player = await getPlayerByName(playerName);
        const playerObj = player.player
        const playerInstance = new Player(playerObj.id, playerObj.name, playerObj.role, playerObj.password, playerObj.times)
        for (let i = 0; i < riddlesArray.length; i++) {
            await calcTimes(
                () => riddlesArray[i].ask(),
                async (seconds) => {
                    playerInstance.recordTime(seconds); // local save
                    try {
                        await recordTime(playerObj.id, seconds); // send to server
                    } catch (error) {
                        console.error("Failed to record time to server:", error);
                    }
                }
            );
        }
        playerInstance.showStats();

    } catch (error) {
        console.error(error);
    }
}



