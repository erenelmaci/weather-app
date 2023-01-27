navigator.geolocation.getCurrentPosition(getWeather)
const apiKey = "2fbafbe3eb671e5aaa277f9324a67ddf&units=metric"


const buttonCheck = document.querySelector(".button-check")

function getWeather(position) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    console.log(`${lat} ${lon}`);
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => console.log(data))
}

