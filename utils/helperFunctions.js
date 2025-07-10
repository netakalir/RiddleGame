import rl from "readline-sync"

export async function calcTimes(taskFunction, anlizaFunction) {
    const start = Date.now();
    await taskFunction()
    const end = Date.now();
    const seconds = Math.floor((end - start) / 1000);
    await anlizaFunction(seconds)
    
}

export function sayHello() {
    console.log("-----welcome to the riddle game-----")
    const name = rl.question("-------what is your name?-----")
    console.log(`--------hello ${name}--------`)
    return name;
}
