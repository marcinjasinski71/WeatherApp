const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const cityInputName = document.querySelector(`.city-input-name`);

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=062efb94fffe352e33ec097ef1717620';
const API_UNITS = '&units=metric';

// --getweather
const getWeather = () => {
	const city = input.value || 'Warsaw';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	// koordy z api
	function getCoordintes() {
		const options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		function success(pos) {
			const crd = pos.coords;
			const lat = crd.latitude.toString();
			const lng = crd.longitude.toString();
			const coordinates = [lat, lng];
			console.log(`Latitude: ${lat}, Longitude: ${lng}`);
			getCity(coordinates);
			return;
		}

		function error(err) {
			console.warn(`ERROR(${err.code}): ${err.message}`);
		}

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	function getCity(coordinates) {
		const xhr = new XMLHttpRequest();
		const lat = coordinates[0];
		const lng = coordinates[1];

		xhr.open(
			'GET',
			'https://us1.locationiq.com/v1/reverse.php?key=pk.6a2840edeab3ef01449fe0440d3fa81e&lat=' +
				lat +
				'&lon=' +
				lng +
				'&format=json',
			true
		);
		xhr.send();
		xhr.onreadystatechange = processRequest;
		xhr.addEventListener('readystatechange', processRequest, false);

		function processRequest(_e) {
			if (xhr.readyState == 4 && xhr.status == 200) {
				const response = JSON.parse(xhr.responseText);
				const cityName = response.address.city;
				myCity = cityName;
				console.log(cityName);
				// return cityName;
			}
		}
	}

	getCoordintes();

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
		.catch(() => (warning.textContent = `Please enter valid city name !`));
};

// ==============================================
// enter jako event wywolujacy getWeather
const enterCheck = e => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener(`keyup`, enterCheck);
button.addEventListener(`click`, getWeather);
getWeather();
