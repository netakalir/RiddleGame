import rl from "readline-sync"
export function calcTimes(cb) {
    const start = Date.now();
    cb()
    const end = Date.now();
    return Math.floor((end - start) / 1000);
    // player.recordTime(seconds)
}
// export function calcTimes(cb, player) {
//     const start = Date.now();
//     cb()
//     const end = Date.now();
//     const seconds = Math.floor((end - start) / 1000);
//     player.recordTime(seconds)
// }

export function sayHello() {
    console.log("-----welcome to the riddle game-----")
    const name = rl.question("-------what is your name?-----")
    console.log(`--------hello ${name}--------`)
    return name;
}
