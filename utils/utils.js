function aleatorio(minimo, maximo, decimales) {
    var precision = Math.pow(10, decimales);
    minimo = minimo*precision;
    maximo = maximo*precision;
    return Math.floor(Math.random()*(maximo-minimo+1) + minimo) / precision;
}

const nm = aleatorio(1, 100, 4)

let today = new Date()
let hours = today.getHours()
let mins = today.getMinutes()
let secs = today.getSeconds()
let currTime = ""
if (hours<10) {
    currTime=`0${hours}${mins}${secs}`
} else if (mins<10) {
    currTime=`${hours}0${mins}${secs}`
} else if (secs<10) {
    currTime=`${hours}${mins}0${secs}`
} else {
    currTime=`${hours}${mins}${secs}`
}

const min = (array) => {
    array.reduce((a, b) => {
        a < b ? a : b
    })
}

export { nm, currTime, min }