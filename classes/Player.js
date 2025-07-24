class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.role = player.role
        this.password = player.password
        this.times = player.times || [];

    }

    async recordTime(second) {
        this.times.push(second);
        
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

