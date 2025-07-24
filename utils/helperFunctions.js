import rl from "readline-sync"
import { register, login } from "../services/auth.servises.js";


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
    return name;
}

export async function enter() {
    try {
        const playerName = await sayHello()
        let player = {
        }
        player.name = playerName;
        let password;
        console.log(`--------hello ${playerName}--------`)
        const chose = Number.parseInt(rl.question(`${player.name} Choose: 1-signin, 2-signup: `))
        switch (chose) {
            case 1:
                password = rl.question("-------what is your password?-----")
                break;
            case 2:
                password = rl.question("-------define password-----")
                break;
        }
        player.password = password
        return player
    } catch (error) {
        console.error(error);
    }
}

export async function authenticate() {
    const choice = Number.parseInt(rl.question("Enter choice [1-Register / 2-Login]: "))
    console.log("choice", choice);
    switch (choice) {
        case 1:
            console.log("try to fatch");
            await register()
            console.log("fatch");


            break;

        case 2:
            await login()
            break


    }
}

