// Grab DOM Elements from the html
const searchBar = document.querySelector("#searchBar");
const submitBtn = document.querySelector("#submitBtn");
const cityTitle = document.querySelector("#cityTitle")
const temperatureBox = document.querySelector("#temperature");
const humidityBox = document.querySelector("#humidity");
const windspeedBox = document.querySelector("#windspeed");
const uvIndexBox = document.querySelector("#uvIndex")
const fiveDayForecastDiv = document.querySelector("#fiveDayForecastDiv")

$(document).ready(function() {
    // get last searched from local storage

    // get today information
    const today = luxon.DateTime.local().toLocaleString({
        weekday: "short",
        month: "short",
        day: "2-digit",
    });
    
    console.log(today);


    function fiveDayWeather(searchedCity){
        cityName = searchedCity
        const apiKey = "d97eef3a7948c38c7df6cf91a2d5c2a8";
        var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`

        $.ajax({
            method: "GET",
            url: fiveDayURL
        }).then(function (res) {
            console.log(res.list);

            let day1 = res.list[0];
            let day2 = res.list[8];
            let day3 = res.list[16];
            let day4 = res.list[24];
            let day5 = res.list[32];

            fiveDayForecast = [day1, day2, day3, day4, day5]
            console.log(fiveDayForecast)

            fiveDayForecast.forEach(day => {
                const tempF = Math.round((day.main.temp - 273.15) * 1.8 + 32)
                const humidity = day.main.humidity
                const date = day.dt_txt
                // Append the 5 day bootstrap cards
                $(".card-group").append(`
                <div class="card">
                <div class="card-body">
                    <!-- Name of City (X/XX/XXXX) emoji -->
                <h5 class="card-title">Date ${date}</h5>
                <!-- temperature: -->
                <p class="card-text" id="termperature">Temperature: ${tempF}°F</p>
                <!-- humidity:  -->
                <p class="card-text" id="humidity">Humidity: ${humidity}%</p>
                </div>
            </div>
                `);
                
            });

        })
    }

    // get current weather for that city
    function currentWeather(searchedCity){
        cityName = searchedCity;
        const apiKey = "d97eef3a7948c38c7df6cf91a2d5c2a8";
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

        $.ajax({
            method: "GET",
            url: queryURL,
        }).then(function (res) {
            console.log(res);


            // humidity, windspeed, temp in fareinheit
            var humidity = res.main.humidity
            var windspeed = Math.round(res.wind.speed)
            var tempF = Math.round((res.main.temp - 273.15) * 1.8 + 32);

            cityTitle.innerHTML = "City: " + cityName
            temperatureBox.innerHTML = "Temperature: " + tempF + "°F";
            humidityBox.innerHTML = "Humidity: " + humidity + "%";
            windspeedBox.innerHTML = "Windspeed: " + windspeed + " MPH";

            // lat and long for uvi search
            var lat = res.coord.lat;
            var lon = res.coord.lon;

            var uvQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            $.ajax({
                method: 'GET',
                url: uvQueryURL,
            }).then(function (res) {
                console.log(res.value);
                var uv = res.value
                
                uvIndexBox.innerHTML = "UV Index: " + uv;
            })
        });
    };

    // tell form to listen for submit and grab city name
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        console.log('pressed');
        var cityName = searchBar.value.trim()
        console.log(cityName);
        currentWeather(cityName);
        fiveDayWeather(cityName);
        
    })
})