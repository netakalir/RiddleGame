import rl from "readline-sync";
class Riddle {
    constructor(id, name, taskdescription, correctAnswer) {
        this.id = id;
        this.name = name;
        this.taskdescription = taskdescription;
        this.correctAnswer = correctAnswer
    }

    ask() {
        console.log(`The riddle is: ${this.taskdescription}`)
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