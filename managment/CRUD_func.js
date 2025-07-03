import fs from "fs"

function playGame() {
    console.log("Starting the game");
}
async function showAllRiddle() {
    console.log("======all riddles======");
    try{
        const riddles = await readRiddles()
        console.log(riddles);
    }
    catch(err){
        console.log("error reading riddles " + err);
    }

    
}
function createRiddle() {
    console.log("Creating a new riddle");
    
}
function readRiddles() {
    console.log("Reading all riddles");
    return new Promise((res,rej)=>{
        fs.readFile("../riddles/db.txt","utf-8",((err,data)=>{
            if(err){
                rej(err);
            }
            res(JSON.parse(data))
        }))
    })
}
async function updateRiddle() {
    console.log("Updating an existing riddle");
    try{
        const riddles = await readRiddles()
    }
    catch(err){
        
    }
    

}
function deleteRiddle() {
    console.log("Deleting a riddle");

}
function viewLeaderboard() {
    console.log("Viewing the leaderboard");

}
// readRiddles()

showAllRiddle()










// async function fetchData() {
//     try {
//         const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1&#39;);
//         const user = await userResponse.json();

//         const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
//         const posts = await postsResponse.json();

//         const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`);
//         const comments = await commentsResponse.json();

//         const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${posts[0].userId}/albums`);
//         const albums = await albumsResponse.json();

//         const photosResponse = await fetch(`https://jsonplaceholder.typicodee.com/albums/${albums[0].id}/photos`);
//         const photos = await photosResponse.json();
//         console.log('User:', user.name);
//         console.log('Posts count:', posts.length);
//         console.log('Comments count:', comments.length);
//         console.log('Albums count:', albums.length);
//         console.log('Photos count:', photos.length);
//         console.log('First photo:', photos[0].title);
//     } catch (error) {
//         console.log(error);
//     }
// }
// // fetchData();
// console.log("EndFile")