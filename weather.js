let isInfoGenerated = false
const button = document.querySelector('#fetchBtn');

//https://www.weatherapi.com/docs/
const apiKey = '1a8d0fbfb3a444fb87970040231803';
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=';
let weatherLocation ='';



button.addEventListener('click', async e => {
let inputField = document.getElementById('inputField')
if (inputField.length != 0) {
    weatherLocation = inputField.value
}

let apiUrl = `${baseUrl}${apiKey}&q=${weatherLocation}&aqi=yes`;
const response = await fetch(apiUrl);
const data = await response.json();

console.log(data);
displayWeatherInfo(data)
})

const displayWeatherInfo = (data) => {
    const weatherIconUrlRaw = data.current.condition.icon;
    const weatherIconUrlRefined = weatherIconUrlRaw.substring(2);
   
    const weatherContainer = document.getElementById('weatherInfo');
    const weatherHeader    = document.getElementById('searchHeader');


    const iconImage = document.createElement('img');
    iconImage.className = 'locationHeader';
    iconImage.src='https://' + weatherIconUrlRefined;

  
    let weatherLocationQuery = document.createElement ('h2');
    weatherLocationQuery.className = 'locationHeader';
    weatherLocationQuery.innerHTML = data.location.name + ', ' + data.location.country;

    const localTime = document.createElement('p');
    localTime.className = 'locationHeader';
    localTime.innerHTML = 'Local time: '  + data.location.localtime;

    

    const weatherType = document.createElement('p');
    weatherType.className = 'weatherInfoElements';
    weatherType.innerHTML = 'Weather: ' + data.current.condition.text;

    const weatherDegreesC = document.createElement('p');
    weatherDegreesC.className = 'weatherInfoElements';
    weatherDegreesC.innerHTML = 'Degrees: '  + data.current.temp_c + '°C';

    const weatherFeelsLikeC = document.createElement('p');
    weatherFeelsLikeC.className = 'weatherInfoElements';
    weatherFeelsLikeC.innerHTML = 'Feels like: '  + data.current.feelslike_c + '°C';

 

    if (isInfoGenerated) {
        weatherHeader.innerHTML   ="";
        weatherContainer.innerHTML="";
    } 

    weatherHeader.appendChild(iconImage);
    weatherHeader.appendChild(weatherLocationQuery);
    //weatherHeader.appendChild(localTime);
    
    weatherContainer.appendChild(weatherType);
    weatherContainer.appendChild(weatherDegreesC);
    weatherContainer.appendChild(weatherFeelsLikeC);
    
    isInfoGenerated = true;
}

