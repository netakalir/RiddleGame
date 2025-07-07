class Player {
    constructor(id,name) {
        this.id = id;
        this.name = name;
        this.times = [];
        this.LoweatTimes;
    }

    recordTime(second) {
        this.times.push(second)
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