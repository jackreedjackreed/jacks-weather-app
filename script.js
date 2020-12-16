
cityName = "Nashville"

const apiKey = "d97eef3a7948c38c7df6cf91a2d5c2a8"
var queryConstants = "api.openweathermap.org/data/2.5/weather?q="

var testing = "api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d97eef3a7948c38c7df6cf91a2d5c2a8";


// search for a city
    // build search query --> after button press
function generalCall(nerm) {
    console.log("banana");
     // format what's entered to make it usable in search query
    var queryURL = (queryConstants + nerm + "&appid=" + apiKey);
    console.log(queryURL);
    // do search
    return queryURL
    
};

var URLL = generalCall(cityName);


$.ajax({
    url: URLL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      console.log("apple");
  });
    
        
    // display results
        // current conditions in main container›
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