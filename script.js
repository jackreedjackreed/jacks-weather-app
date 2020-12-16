
cityName = "Nashville"

const apiKey = "d97eef3a7948c38c7df6cf91a2d5c2a8"
var queryConstants = "https://api.openweathermap.org/data/2.5/weather?q="

var testing = "api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d97eef3a7948c38c7df6cf91a2d5c2a8";


// search for a city
    // build search query --> after button press (NERM = NAME)
function getCityObj(nerm) {
     // format what's entered to make it usable in search query
    var queryURL = (queryConstants + nerm + "&appid=" + apiKey);
    // console.log(queryURL);
    // do search
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          strungObj = JSON.stringify(response);
          console.log(strungObj[0]);
          console.log(strungObj);
          // getDataFromObj(response);
          return response
      });
    
};


console.log(getCityObj("nashville"));

function getNameFromObj(strungObj) {
    var objName = strungObj;
    console.log(objName + "hey");
    return objName;
}

getNameFromObj(getCityObj("nashville"));

function getDataFromObj(data) {
    let ObjDict = {}
    var cityName = data.name;
    console.log(cityName);
    var cityTemp;

}



       
    
        
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