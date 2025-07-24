import rl from "readline-sync"


export async function register() {
    const name = rl.question("insert your name:> ")
    const password = rl.question("insert password:> ")
    const response = await fetch("http://localhost:3005/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name,password})
    })
    return await response.json()
}

export async function login() {
    const response = await fetch("http://localhost:3005/auth/login")
    return await response.json()
}