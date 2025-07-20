import rl from "readline-sync"

export async function calcTimes(cb, anlizaFunction) {//calculate time. helper func
    const start = Date.now();
    await cb()
    const end = Date.now();
    const seconds = Math.floor((end - start) / 1000);
    await anlizaFunction(seconds)

}

export async function sayHello() {//say hlloo to user and save his name
    console.log("-----welcome to the riddle game-----")
    const name = rl.question("-------what is your name?-----")
    console.log(`--------hello ${name}--------`)
    return name;
}


