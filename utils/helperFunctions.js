import rl from "readline-sync"
import { register, login } from "../services/auth.servises.js";
import { adminMenu,userMenu } from "./menus.js";


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
    switch (choice) {
        case 1:
            try {
                await register()
                console.log("Registration was successful.");
            } catch (error) {
                console.error("Registration faild:> ", error);
            }
            break;

        case 2:
            try {
                const response = await login()
                // if (!response) return; 
                console.log("login successfully");

                if(response.player.role === "admin"){
                    await adminMenu()
                }
                else if(response.player.role === "user"){
                    await userMenu()
                }
                
                break;
            } catch (error) {
                console.error("login faild:> ", error);
            }


    }
}

