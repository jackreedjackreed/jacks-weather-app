// Grab DOM Elements from the html
const searchBar = document.querySelector("#searchBar");
const submitBtn = document.querySelector("#submitBtn");
const cityTitle = document.querySelector("#cityTitle")
const temperatureBox = document.querySelector("#temperature");
const humidityBox = document.querySelector("#humidity");
const windspeedBox = document.querySelector("#windspeed");
const uvIndexBox = document.querySelector("#uvIndex")
const fiveDayForecastDiv = document.querySelector("#fiveDayForecastDiv")



cityName = "Nashville"


// var testing = "api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d97eef3a7948c38c7df6cf91a2d5c2a8";

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
            

            fiveDayForecast.forEach({
                
            })

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
            temperatureBox.innerHTML = "Temperature: " + tempF + " F";
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

        // put all the returned data stored as variables into the html

        
        


    };

    // tell form to listen for submit and grab city name
    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();

        console.log('pressed');
        var cityName = searchBar.value.trim()
        console.log(cityName);
        currentWeather(cityName);
        fiveDayWeather(cityName);
        
    

    // get 5-day forecast for that city
    

    })

// // search for a city
//     // build search query --> after button press (NERM = NAME)
//     function getCityObj(name, handleData) {
//         // format what's entered to make it usable in search query
//        var queryURL = (queryConstants + name + "&appid=" + apiKey);
//        // do search
//        ($.ajax({
//            url: queryURL,
//            method: "GET"
//          }).then(handleData)
//            // console.log(response);
//            //   strungObj = JSON.stringify(response);
//            //   console.log(strungObj + " strungObj");
//            //   parseObj = strungObj.JSON.parse();
//            //   console.log(parseObj + " parseObj");
//              // getDataFromObj(response);
//              //return response
//        );
//    };
//    var CityObj = {}
//    getCityObj( "nashville", getDataFromObj);
//    console.log(CityObj);                                   /// here, cityobj gets its shit defined bc its global
//    var testing = getCityObj("milan", getDataFromObj)
//    console.log(testing);
   
//    function getDataFromObj( response ) {
//        // name
//        CityObj.name = response.name;
//        // weather
//        CityObj.weather = response.weather[0].main; 
//        // temperature
//        var kTemp = response.main.temp;
//        var fTemp = Math.round(kTemp*1.8 - 459.67)
//        CityObj.temperature = fTemp;
//        // humidity
//        CityObj.humidity = response.main.humidity;
//        // wind speed
//        CityObj.windspeed = response.wind.speed;
//        console.log(CityObj);
//        return CityObj
   
//    }
   
           
//        // display results
//            // current conditions in main container›
//                // icon to rep conditions
//                // temp, humidity, windspeed
//                // box for UV index
//            // future conditions in bottom 5 boxes
//                // date
//                // icon for weather
//                // temp
//                // humidity
//        // add to search history
//            // add button for each city, make it clickable
//    // upon refresh, presetn last searched city forecast


})

