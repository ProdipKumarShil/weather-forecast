// some variables
const KEY = 'b4673fec0705f8956abc5e4fa2e8283c'
let CITY = 'khulna'
const btn = document.getElementById('btn')
const input = document.getElementById('input')

// functions
// get time
const getTime = timeStamp => {
    const newDate = new Date(timeStamp * 1000).toLocaleString()
    const time = newDate.split(',')[1].split(' ')
    const amOrPm = time[2]
    const hourAndMin = time[1].split(':')
    return `${hourAndMin[0]}:${hourAndMin[1]}`
}
// kelvin to fahrenheit
const toFahrenheit = kelvin => {
    return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(2)
}
// kelvin to celsius
const toCelsius = kelvin => {
    const f = parseFloat(kelvin)
    return (f - 273.15).toFixed(2)
}
// on click search btn
const searchByBtn = () => {
    const inputValue = input.value
    fetchData(inputValue)
}

// active enter key
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        btn.click()
    }
})
// show alert on error
const showAlert = err => {
    if (err.name == 'TypeError') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your city doesn\'t found on earth..',
        })
    }
}

// fetch the data
const fetchData = city => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`
    fetch(url)
        .then(res => res.json())
        .then(data => showData(data))
        .catch(e => showAlert(e))
}

// show all data in container
const showData = (data) => {
    const { main, wind, sys, name, weather } = data
    // console.log(main, wind, sys, weather)

    document.getElementById('tempContainer').innerHTML = `
        <div class="mt-2 flex flex-col justify-evenly items-center ">
            <img class="w-16" src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="">
            <h1 class="text-7xl text-slate-100 font-bold" style="font-family: 'Montserrat', sans-serif;">${toCelsius(main.temp)}<span>&#176;</span>C <sub class="text-lg font-medium hidden md:inline">${data.weather[0].description}</sub></h1>
            <h1 class="text-5xl text-slate-100">${name}</h1>
        </div>
        <div class="flex justify-evenly mt-5 flex-wrap text-slate-300">
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Status</p>
                <p class="font-medium">${data.weather[0].main ? data.weather[0].main : ""}</p>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Temp</p>
                <p class="font-medium">${toFahrenheit(main.temp)}<span>&#176;</span>F</p>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Wind</p>
                <p class="font-medium">${((wind.speed) * 1.609).toFixed(2)} km/h</p>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Humidity</p>
                <p class="font-medium"><span>${main.humidity}</span>%</p>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Sunrise</p>
                <p class="font-medium">${getTime(sys.sunrise)}</p>
            </div>
            <div class="flex flex-col items-center">
                <p class="text-2xl font-semibold">Sunset</p>
                <p class="font-medium">${getTime(sys.sunset)}</p>
            </div>
        </div>
    `
}

fetchData('khulna')