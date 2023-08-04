
function updateClockAndDate() {
  const clockAndDateElement = document.getElementById('clockAndDate');
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString();
  clockAndDateElement.textContent = `${time} ${date}`;
}

setInterval(updateClockAndDate, 1000);


const API_KEY = '071d5ec7cdc74387e8f87f20f9fb183c';
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherContainer = document.querySelector('.weather-container');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.description');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
  }
});

async function getWeatherData(city) {
  try {
    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const response = await fetch(weatherEndpoint);
    const data = await response.json();

    locationElement.textContent = data.name;
    temperatureElement.textContent = `${data.main.temp} °C`;
    descriptionElement.textContent = data.weather[0].description;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    locationElement.textContent = 'City not found';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
  }
}

