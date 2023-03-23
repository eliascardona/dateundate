function aleatorio(minimo, maximo, decimales) {
    let precision = Math.pow(10, decimales);
    minimo = minimo*precision;
    maximo = maximo*precision;
    return Math.floor(Math.random()*(maximo-minimo+1) + minimo) / precision;
}

const nm = () => aleatorio(1, 100, 4)

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

export function timeDifference(current, previous) {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
            return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
            return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
            return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}
