import fs from "fs/promises"
import { readPlayers } from "../services/players.services.js";
class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.times = player.times || []; 
        this.LowestTimes = player.LowestTimes;
    }

    async RC(second){
        this.times.push(second)
        const oldData = await readPlayers();
        
    }
    
    async recordTime(second) {
        console.log(this);
        this.times.push(second);
        let data;
        data = await readPlayers()
        // try {
        // } catch (error) {
        //     console.log(error);
        // }
        console.log(data);
        const newData = JSON.parse(data)
        const index= newData.findIndex((user)=> {
            console.log(user.id, this.id);
            return user.id === this.id;
        });
        if(index === -1){
           return; 
        }
        newData[index].times.push(second);
        fs.writeFile("./DB/players.txt",JSON.stringify(newData),"utf-8",(err)=>{
            if (err){
                console.log("time update was faild." , err);
            }
            else{
                console.log("time update was successful");
            }
        })
    }

    getLowestTimes() {
        if (this.times.length === 0) return null;
        return Math.min(...this.times);
    }

    showStats() {
        let sum = 0;
        let avg = 0;
        for (let i = 0; i < this.times.length; i++) {
            sum += this.times[i];
        }
        avg = sum / this.times.length
        console.log(`great job, ${this.name}!!!!!!!`)
        console.log(`Totel time: ${sum} seconds`);
        console.log(`Average per riddle: ${avg} seconds`);
    }
}

export {
    Player
}

