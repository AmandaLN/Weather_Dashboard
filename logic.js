$(document).ready(function(){
// Global Variables 
let date = moment().format('MMMM Do YYYY'); 
let APIkey = "4ccbf9f34a00fc03eaba263b0909b944";
let cityName;
let searchValue;
let tRow = $("#today");

// latitude = respone.coord.lat;
// longitude = response.coord.lon;


$("#search-button").on("click", function(){
    searchValue = $("#search-value").val();
    $("#search-value").val("")
    searchWeather(searchValue);
})

function firstRow(response) {
    // creating 1st row for current weather
    let weatherIcon = response.weather.icon;
    console.log(weatherIcon);
    let todaysWeather = $("<h2>").text(searchValue + ": " + date + weatherIcon);

    // adding divs for each weather catagory and assigning text
    let temperature = $("<div>").text("Temperature: " + response.main.temp);
    let humidity = $("<div>").text("Humidity: " + response.main.humidity);
    let windSpeed = $("<div>").text("Windspeed: " + response.wind.speed);
    //let UVIndex = $("<div>").text("UV Index: " + response);

    // append to page
    tRow.append(todaysWeather, temperature, humidity, windSpeed);
    // add row to body
    $("tbody").append(tRow);

}

function searchWeather(searchValue) {
    $.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,
    
  }).then(function(response) {
      console.log(response);
    firstRow(response);

    })
 
}
// $.ajax({
//     method: "GET",
//     url: "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}" + cityName + APIkey,
    
//   }).then(function(response){
    

//   })


//   $.ajax({
//     method: "GET",
//     url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + APIkey,
    
//   }).then(function(response){
    

//   })
















})