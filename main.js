const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const API_KEY = '9ec7391e64713710a3b9a5d671aedd3e';
const btn = document.querySelector('.btn');

const cityApi = (city) => {
   return `${API_URL}q=${city}&appid=${API_KEY}`;
};

async function  findWeatherByCity() {
  const city = document.querySelector('.input').value;
  console.log(city);
  // if(!city) {
  //   alert('Please enter city name');
  // }

  const weatherFind = cityApi('Osh');
  const response = await fetch(weatherFind);
  const data = await response.json();
  const sunrise = data.city.sunrise;
  const date = new Date(sunrise);
  console.log(date.toString());
  console.log(data);
  displayResults(data);


}
function displayResults(data) {
  const weatherWrap = document.querySelector('.weather-wrap');
  const weatherBlock = document.createElement('div');
  weatherBlock.classList.add('weather-blocks');
  const temp = Math.round(data.list[1].main.temp);
  const temp_min = Math.round(data.list[1].main.temp_min);
  const temp_max = Math.round(data.list[1].main.temp_max);
  const temp2 = Math.round(data.list[2].main.temp);
  const temp3 = Math.round(data.list[3].main.temp);
  weatherBlock.innerHTML =`
   <div class="details">
          <div class="sunset-sunrise">
            <div class="sunrise">
              <span class="space sunr">
                Sunrise
              </span>
              <span class="space">
                ${new Date().getHours(data.city.sunrise)}am
              </span>
            </div>
            <div class="sunset">
              <span class="space suns">
                Sunset
              </span>
              <span class="space">
                ${new Date().getHours(data.city.sunset)}pm
              </span>
            </div>
          </div>
          <div class="other-details">
            <div class="first-block">
              <i class="wind-img"></i>
              <span>Humidity ${data.list[1].main.humidity} %</span>
              <i class="wind-img"></i>
              <span>Wind ${data.list[1].wind.speed} km/h</span>
            </div>
            <div class="second-block">
              <i class="rain-img"></i>
              <span>Pressure ${data.list[1].main.pressure}</span>
              <i class="rain-img"></i>
              <span>Gust ${data.list[1].wind.gust}</span>
            </div>
          </div>
        </div>
        <div class="temp-info">
          <span class="today">Today</span>
          <img src="./img/mist.png" alt="main-condition" class="main-condition">
          <h2 class="temp">${temp}℃</h2>
          <span class="min-temp">${temp_min}℃ - <span class="max-temp">${temp_max}℃</span></span>
        </div>
        <div class="hour-temp-details">
          <div class="second-temp-block">
            <span class="min-temp second">${temp_min}℃ - </span>
            <span class="max-temp second">${temp_max}℃</span>
          </div>
          <div class="hour-temp-details-block">
              <div class="first-hour">
                  <i class="cond-img first"></i>
                  <span class="temperature">${temp}℃ </span>
                  <span class="time">${data.list[1].dt_txt}</span>
                  <span class="main-cond">${data.list[1].weather[0].main}</span>
              </div>
            <div class="second-hour">
              <i class="cond-img second"></i>
              <span class="temperature">${temp2}℃ </span>
              <span class="time">${data.list[2].dt_txt}</span>
              <span class="main-cond">${data.list[2].weather[0].main}</span>
            </div>
            <div class="third-hour">
              <i class="cond-img third"></i>
              <span class="temperature">${temp3}℃ </span>
              <span class="time">${data.list[3].dt_txt}</span>
              <span class="main-cond">${data.list[3].weather[0].main}</span>
            </div>
          </div>
          <div class="final-block">
            <span class="news">News Update</span>
            <span class="tomorrow">View Tomorrow forecast -> </span>
          </div>
        </div>
  `;
  weatherWrap.append(weatherBlock);
}

btn.addEventListener('click', findWeatherByCity())


