class Player{
    constructor(name){
        this.name = name;
        this.times = [];
    }

    recordTime(second){
        this.times.push(second)
    }

    showStats(){
        let sum = 0;
        let avg = 0;
        for (let i = 0; i < this.times.length;i++){
            sum += this.times[i];
        }
        avg = sum / this.times.length
        console.log(`great job, ${this.name}!!!!!!!`)
        console.log(`Totel time: ${sum} seconds`);
        console.log(`Average per riddle: ${avg} seconds`);
    }
}

export{
    Player
}