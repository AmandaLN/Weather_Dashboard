$(document).ready(function () {
    // Global Variables 
    let date = moment().format('MMMM Do YYYY');
    let APIkey = "4ccbf9f34a00fc03eaba263b0909b944";
    let searchValue;
    let tRow = $("#today");
    // let UVIndex;
    // let city;
    // let cityHistory = $(".history");
     let underRow = $("#forecast");
    // let underRowDisplay = [];

    $("#search-button").on("click", function () {
        searchValue = $("#search-value").val();
        $("#search-value").val("")
        searchWeather(searchValue);
        searchHistory.push(searchValue);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    $("#clear-history").on("click",function() {
        searchHistory = [];
        renderSearchHistory();
        localStorage.clear();
    })

    function renderSearchHistory() {
        $("#history").text("");
        for (let i=0; i<searchHistory.length; i++) {
            const historyItem = $("<button>");
            historyItem.text(seeachHistory[i]);
            historyItem.attr("readonly",true);
            historyItem.attr("class", "form-control d-block bg-white");
            historyItem.attr("value", searchHistory[i]);
            historyItem.on("click",function() {
                getWeather(historyItem).val();
            })
            $("#history").append(historyItem);
        }
    }
    renderSearchHistory();
    if (searchHistory.length > 0) {
        createRow(searchHistory[searchHistory.length - 1]);
    }


    function firstRow(response) {
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

        // function forecast(response) {
            
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=" + APIKey,
                method: "GET"
            }).then(function (response) {
                for (i = 0; i < 5; i++) {
                    var date = new Date((response.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
                    var iconcode = response.list.weather[0].icon;
                    var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
                    var tempK = response.list.main.temp;
                    var tempF = (((tempK - 273.5) * 1.80) + 32).toFixed(2);
                    var humidity = response.list.main.humidity;
    
                    // $("#fDate" + i).html(date);
                    // $("#fImg" + i).html("<img src=" + iconurl + ">");
                    // $("#fTemp" + i).html(tempF + "&#8457");
                    // $("#fHumidity" + i).html(humidity + "%");

                    underRow.append(date, iconcode, iconurl, tempF, humidity);
                // add row to body
                    $("tbody").append(underRow);
                };
            });
        



    }

    function searchWeather(searchValue) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,

        }).then(function (response) {
            console.log(response);
            firstRow(response);

        })
    };

   
})
    // function forecastWeather(searchValue) {
    //     $.ajax({
    //      method: "GET",
    //      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&units=imperial" + "&appid=" + APIkey,

    //      }).then(function(response){
    //             console.log(response);

    //         $("day1").empty();
    //         let forecastDate = $("<dvi>").text(moment().add(1, 'days').format('MMMM Do YYYY'));

    //     })

    //  
    //  
    // var dayover= false;



    // }
