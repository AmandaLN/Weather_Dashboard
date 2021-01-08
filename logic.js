$(document).ready(function () {
    // Global Variables 
    let date = moment().format('MMMM Do YYYY');
    let APIkey = "4ccbf9f34a00fc03eaba263b0909b944";
    let searchValue;
    let tRow = $("#today");
    // let UVIndex;
    // let underRow = $("#forecast");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    

    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        $("#search-value").val("")
        searchWeather(searchValue);
        searchHistory.push(searchValue);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        renderSearchHistory();
    })
        // seach history for under search button

    $("#clear-history").on("click", function () {
        searchHistory = [];
        $("#history").empty();
       // localStorage.setItem("search", searchHistory);
    })

    function renderSearchHistory() {
        $("#history").text("");
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = $("<button>");
            historyItem.text(searchHistory[i]);
            historyItem.attr("readonly", true);
            historyItem.addClass("historyBtn form-control d-block bg-white");
            historyItem.attr("value", searchHistory[i]);
            $("#history").append(historyItem);
        }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        firstRow(searchHistory[searchHistory.length - 1]);
    }


    function firstRow(response) {
        tRow.empty();
        // creating 1st row for current weather
        let todaysWeather = $("<h2>").text(searchValue + ": " + date);
        let weatherIcon = $("<img>");
        weatherIcon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        todaysWeather.append(weatherIcon);
        console.log(weatherIcon);
        // adding divs for each weather catagory and assigning text
        let temperature = $("<div>").text("Temperature: " + response.main.temp);
        let humidity = $("<div>").text("Humidity: " + response.main.humidity);
        let windSpeed = $("<div>").text("Windspeed: " + response.wind.speed);


        // append to page
        tRow.append(todaysWeather, temperature, humidity, windSpeed);
        // add row to body
        $("tbody").append(tRow);

        // uv index
        latitude = response.coord.lat;
        longitude = response.coord.lon;

        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIkey,

        }).then(function (UVIndex) {
            let UVIndexDisplay = $("<div>").text("UV Index: " + UVIndex.value);
            tRow.append(UVIndexDisplay);
            console.log(UVIndex);
        })

        
        // 5 day forecast 
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,
            method: "GET"
        }).then(function (response) {
            // adding icon hum temp and date to 5 day

            $("#fiveFor").empty();
            let fiveFor = $("<h3>").text("5 Day Forecast");
            $("#day1").empty();
            $("#fiveFor").append(fiveFor);

            // Creating date in 5 day forecast
            var forDate = $("<div>").text(moment().add(1, 'days').format('MMMM Do YYYY'));
            $("#day1").append(forDate)
            var forIcon = $("<img>");
            forIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon+ ".png")
            $("#day1").append(forIcon);
            var forTemp = $("<div>").text("Temperature: " + response.list[4].main.temp + "°F")
            $("#day1").append(forTemp)
            var forHum = $("<div>").text("Humidity: " + response.list[4].main.humidity + "%")
            $("#day1").append(forHum)

            $("#day2").empty();
            
            var forDate = $("<div>").text(moment().add(2, 'days').format('MMMM Do YYYY'));
            $("#day2").append(forDate)
            var forIcon = $("<img>");
            forIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[12].weather[0].icon+ ".png")
            $("#day2").append(forIcon);
            var forTemp = $("<div>").text("Temperature: " + response.list[12].main.temp + "°F")
            $("#day2").append(forTemp)
            var forHum = $("<div>").text("Humidity: " + response.list[12].main.humidity + "%")
            $("#day2").append(forHum)

            $("#day3").empty();
            
            var forDate = $("<div>").text(moment().add(3, 'days').format('MMMM Do YYYY'));
            $("#day3").append(forDate)
            var forIcon = $("<img>");
            forIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[20].weather[0].icon+ ".png")
            $("#day3").append(forIcon);
            var forTemp = $("<div>").text("Temperature: " + response.list[20].main.temp + "°F")
            $("#day3").append(forTemp)
            var forHum = $("<div>").text("Humidity: " + response.list[20].main.humidity + "%")
            $("#day3").append(forHum)

            $("#day4").empty();
            
            var forDate = $("<div>").text(moment().add(4, 'days').format('MMMM Do YYYY'));
            $("#day4").append(forDate)
            var forIcon = $("<img>");
            forIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[28].weather[0].icon+ ".png")
            $("#day4").append(forIcon);
            var forTemp = $("<div>").text("Temperature: " + response.list[28].main.temp + "°F")
            $("#day4").append(forTemp)
            var forHum = $("<div>").text("Humidity: " + response.list[28].main.humidity + "%")
            $("#day4").append(forHum)

            $("#day5").empty();
           
            var forDate = $("<div>").text(moment().add(5, 'days').format('MMMM Do YYYY'));
            $("#day5").append(forDate)
            var forIcon = $("<img>");
            forIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[36].weather[0].icon+ ".png")
            $("#day5").append(forIcon);
            var forTemp = $("<div>").text("Temperature: " + response.list[36].main.temp + "°F")
            $("#day5").append(forTemp)
            var forHum = $("<div>").text("Humidity: " + response.list[36].main.humidity + "%")
            $("#day5").append(forHum)
        
            
        })
    
    }
    // current weather info

     function searchWeather(searchValue) {
            $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,

            }).then(function (response) {
            console.log(response);
            firstRow(response);

            })
        } 
        // this isnt work need to fix to update when city is clicked
        $("#history").on("click", "historyBtn", function(event) {
            event.preventDefault();
            console.log($(this).text);
             searchValue = $(this).val();
            searchWeather(searchValue);
        });

})
