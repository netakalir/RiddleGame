import fs from "fs";
import rl from "readline-sync";
import { Riddle } from "../models/Riddle.js";


export async function showAllRiddle() {//פונקציה שמבקשת מהשרת לקבל את כל החידות ולהציג אותם
    
    try {
        const riddles = await readDBFile()
        console.log(riddles);
    }
    catch (err) {
        console.log("error reading riddles " + err);
    }
}

export async function getAllRiddles() {//פונקציה שמבקשת מהשרת את כל החידות שיש אצלו . מאחסנת אותם במערך ומחזירה אותו
    const response = await fetch("http://localhost:3000/riddles/getAllRiddle");
    const data = await response.json();
    return data;
}

export async function createRiddle(riddle) {//פונקציה שמבקשת מהשרת ליצור חידה שהיא מספקת לו והיא תחזיר את התוצאה לצד הלקוח
    const response = await fetch("http://localhost:3000/riddles/creatRiddle", {
        method: "POST",
        body: JSON.stringify(riddle),
        headers: {
            "Content-type": "application/json"
        }
    });
    if (!response.ok) {
        console.log("Server responded with status:", response.status);
        return null;
    }
    const data = response.json();
    return data;
}


export async function updateRiddle(riddle) {//פונקציה שמבקשת מהשרת לעדכן חידה שקיימת בביס נתונים . היא מספקת לשרת חידה חדשה ומחזירה ללוקח את תשובת השרת
    try {
        const response = await fetch("http://localhost:3000/riddles/updateRiddle", {
            method: "PUT",
            body: JSON.stringify(riddle),
            headers: {
                "content-type": "application/json"
            }
        });
        if (!response.ok) {
            console.log("Server responded with status:", response.status);
            return null;
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log("Fetch error:", err);
        return null;
    }
}

export async function deleteRiddleById(id) {//פונקציה שמבקשת מהשרת למחוק חידה שקיימת בבסיס הנתונים על ידי מזהה שהיא מספקת לו
    console.log("Deleting a riddle");
    try {
        const response = await fetch(`http://localhost:3000/riddles/deleteRiddle/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            console.log(`Failed to delete riddle. Status: ${response.status}`);
            return null;
        }
        const result = await response.json();
        return result;
    }
    catch (err) {
        console.log("Error deleting riddle:", err);
        return null;
    }
}