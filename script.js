
cityName = "milan"

const apiKey = "d97eef3a7948c38c7df6cf91a2d5c2a8"
var queryConstants = "api.openweathermap.org/data/2.5/weather?"




// search for a city
    // build search query --> after button press
function generalCall(cityName) {
    console.log("banana");
    var queryURL = (queryConstants + "q=" + cityName + "&appid=" + apiKey);
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
      });
};

generalCall(cityName);

        // format what's entered to make it usable in search query
        // add apiKey and search url and city name
        // do search
    // display results
        // current conditions in main container
            // icon to rep conditions
            // temp, humidity, windspeed
            // box for UV index
        // future conditions in bottom 5 boxes
            // date
            // icon for weather
            // temp
            // humidity
    // add to search history
        // add button for each city, make it clickable
// upon refresh, presetn last searched city forecast