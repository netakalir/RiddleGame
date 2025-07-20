import rl from "readline-sync";
class Riddle {//model of riddle
    constructor(id, name, taskdescription, correctAnswer) {
        this.id = id;
        this.name = name;
        this.taskDescription = taskdescription;
        this.correctAnswer = correctAnswer
    }

    ask() {//question the gaemer riddle
        console.log(`The riddle is: ${this.taskDescription}`)
        let answer;
        do {
            answer = rl.question("Enter your answer: ")
            if (answer !== this.correctAnswer) {
                console.log("-----wrong-----");
            }
        } while (answer !== this.correctAnswer)
        console.log("-----correct answer-----");
    }
}

export{
    Riddle
}