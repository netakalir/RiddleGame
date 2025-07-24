export async function register() {
    const response = await fetch("http://localhost:3005/auth/register")
    return await response.json()
}

export async function login() {
    const response = await fetch("http://localhost:3005/auth/login")
    return await response.json()
}