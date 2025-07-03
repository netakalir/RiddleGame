
export function calcTimes(cb,player){
    const start = Date.now();
    cb()
    const end = Date.now();
    const seconds = Math.floor((end - start)/1000);
    player.recordTime(seconds)
}