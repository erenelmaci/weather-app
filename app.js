const API_KEY = "10439565916cb24be2a5f3daf0d08a46&units=metric"
const input = document.querySelector(".input")
const button = document.querySelector(".button")

const card1 = document.querySelector(".weather-info1")
const card2 = document.querySelector(".weather-info2")
const card3 = document.querySelector(".weather-info3")
const card4 = document.querySelector(".weather-info4")
const card5 = document.querySelector(".weather-info5")

navigator.geolocation.getCurrentPosition(getWeather, showError)

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("Konum servisi kapalı. Lütfen konum servisini açın.")
      break
    case error.POSITION_UNAVAILABLE:
      alert("Konum bilgisi kullanılamıyor.")
      break
    case error.TIMEOUT:
      alert("Konum bilgisi alma zaman aşımına uğradı.")
      break
    case error.UNKNOWN_ERROR:
      alert("Bilinmeyen hata.")
      break
  }
}

console.log(navigator.geolocation)

window.addEventListener("load", () => {
  showError(error)
})

function getWeather(position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => displayWeather(data))
}

function getWeatherByCity(input) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${API_KEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res.json()
    })
    .then((data) => {
      if (!data.city) {
        throw Error("City not found")
      }
      displayWeather(data)
    })
    .catch((error) => {
      alert.error(error)
    })
}

const displayWeather = (data) => {
  const cityName = data.city.name
  console.log(data)
  const country = data.city.country
  const weatherData = data.list

  const today = new Date()
  const todayDate = today.getDate()

  let fiveDaysForecast = []
  for (let i = 0; i < 5; i++) {
    const forecastDate = new Date(today)
    forecastDate.setDate(todayDate + i)
    let forecastData = weatherData.filter((item) => {
      const itemDate = new Date(item.dt_txt)
      return itemDate.toDateString() == forecastDate.toDateString()
    })
    let dayForecast = {
      date: forecastDate,
      temperature: 0,
      weather: "",
    }
    forecastData.forEach((item) => {
      dayForecast.temperature += item.main.temp
    })
    dayForecast.temperature = dayForecast.temperature / forecastData.length
    dayForecast.weather = forecastData[0].weather[0].main
    fiveDaysForecast.push(dayForecast)
  }
  card1.innerHTML += `<section class="city">${cityName} <sup>${country}</sup></section>
          <section class="degree">Hissedilen Sıcaklık: ${fiveDaysForecast[0].temperature.toFixed(
            1
          )}°C</section>
          <section class="weather">${fiveDaysForecast[0].weather}</section>
          <section class="info">${fiveDaysForecast[0].date}</section>`
  card2.innerHTML += `<section class="city">${cityName} <sup>${country}</sup></section>
          <section class="degree">Hissedilen Sıcaklık: ${fiveDaysForecast[1].temperature.toFixed(
            1
          )}°C</section>
          <section class="weather">${fiveDaysForecast[1].weather}</section>
          <section class="info">Hissedilen Sıcaklık: ${fiveDaysForecast[1].date}</section>`
  card3.innerHTML += `<section class="city">${cityName} <sup>${country}</sup></section>
          <section class="degree">Hissedilen Sıcaklık: ${fiveDaysForecast[2].temperature.toFixed(
            1
          )}°C</section>
          <section class="weather">${fiveDaysForecast[2].weather}</section>
          <section class="info">${fiveDaysForecast[2].date}</section>`
  card4.innerHTML += `<section class="city">${cityName} <sup>${country}</sup></section>
          <section class="degree">Hissedilen Sıcaklık: ${fiveDaysForecast[3].temperature.toFixed(
            1
          )}°C</section>
          <section class="weather">${fiveDaysForecast[3].weather}</section>
          <section class="info">${fiveDaysForecast[3].date}</section>`
  card5.innerHTML += `<section class="city">${cityName} <sup>${country}</sup></section>
          <section class="degree">Hissedilen Sıcaklık: ${fiveDaysForecast[4].temperature.toFixed(
            1
          )}°C</section>
          <section class="weather">${fiveDaysForecast[4].weather}</section>
          <section class="info">${fiveDaysForecast[4].date}</section>`

  console.log(fiveDaysForecast[0])
  console.log("City: ", cityName)
  console.log("Country: ", country)
  console.log("5 Days Forecast: ", fiveDaysForecast)
}

button.addEventListener("click", (e) => {
  for (let i = 0; i < 5; i++) {
    var infoWeat = document.getElementsByClassName("info-weat")[i]
    while (infoWeat.firstChild) {
      infoWeat.removeChild(infoWeat.firstChild)
    }
  }
  e.preventDefault()
  getWeatherByCity(input)
})
