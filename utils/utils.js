const randomNumber = Math.random()
const nm = randomNumber*1000

let today = new Date()
let hours = today.getHours()
let mins = today.getMinutes()
let secs = today.getSeconds()
let currTime = `${hours}-${mins}-${secs}`

export { nm, currTime }