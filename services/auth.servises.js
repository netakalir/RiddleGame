import rl from "readline-sync"


export async function register() {
    const name = rl.question("insert your name:> ")
    const password = rl.question("insert new password:> ")
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
    const name = rl.question("insert your name:> ")
    const password = rl.question("insert your password:> ")
    const response = await fetch("http://localhost:3005/auth/login",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,password})
    })

    if(!response.ok){
        const error = await response.json();
        console.log("Login failed:", error.error);
        return null;
    }
    const res = await response.json()
    setToken(res.token)
    return res
}

let token = null;//global veriabal to store at token

export function setToken(value) {
    token = value;
}

export function getToken() {
    return token;
}