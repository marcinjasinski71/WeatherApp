const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=062efb94fffe352e33ec097ef1717620';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || `London`;
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			weather.textContent = status.main;
			cityName.textContent = res.data.name;
			temperature.textContent = Math.round(temp) + '°C';
			humidity.textContent = hum + '%';

			warning.textContent = ``;
			input.value = ``;

			if (status.id >= 200 && status.id <= 250) {
				photo.setAttribute(`src`, `./img/thunderstorm.png`);
			} else if (status.id >= 300 && status.id <= 350) {
				photo.setAttribute(`src`, `./img/drizzle.png`);
			} else if (status.id >= 500 && status.id <= 550) {
				photo.setAttribute(`src`, `./img/rain.png`);
			} else if (status.id >= 600 && status.id <= 650) {
				photo.setAttribute(`src`, `./img/fog.png`);
			} else if ((status.id = 800)) {
				photo.setAttribute(`src`, `./img/sun.png`);
			} else if (status.id >= 801 && status.id <= 820) {
				photo.setAttribute(`src`, `./img/clouds.png`);
			} else {
				photo.setAttribute(`src`, `./img/unknown.png`);
			}
		})
		.catch(() => (warning.textContent = `Wpisz poprawną nazwe miasta !`));
};

const enterCheck = e => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener(`keyup`, enterCheck);
button.addEventListener(`click`, getWeather);
getWeather();
