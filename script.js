// JavaScript function that wraps everything
$(document).ready(function() {
    var citiesSearched = [];
    var newCity = "";
    APIKey = "9d8f90492517a80c2e29ed9275d65abe";
    //when clicked search button
    $("#search-btn").on("click", function(event) {
        event.preventDefault();
        //get user's city search input 
        newCity = $("#city-input").val().trim();
        //alert if input is empty
        if (!newCity) {
            alert("City input cannot be empty. Please enter a city name")
        }
        //add new city to citiesSearched array if a city is entered
        else {
            citiesSearched.unshift(newCity);
            //call addSearchedCity function to add city to cities-searched div
            addSearchCity();  
        }
        //call todayWeather function to display today's weather in today-weather-container div
        todayWeather();
        
    });
    //function that add the most recently searched cities to the cities-searched div
    function addSearchCity() {
        $("#cities-searched").empty();
        for (var i = 0; i< citiesSearched.length; i++) {
            var a = $("<div>");
            a.addClass("new-city-searched border rounded");
            a.text(citiesSearched[i]);
            $("#cities-searched").append(a);
        }
    }
    function todayWeather() {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/weather?q="+ newCity + "&appid=" + APIKey,
            method: "GET"
        }).then(function(response){
            console.log(response);
            //var dateToday = moment().format("l");
            var iconToday = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
            var tempToday = (Math.round(((parseInt(response.main.temp) - 273.15) * (9/5) + 32) * 10) / 10 + " \u00B0F");
            var humToday = response.main.humidity + "%";
            var windToday = Math.round((parseInt(response.wind.speed) * 2.2369) * 10) / 10 + " MPH";
            //console.log(dateToday);
            console.log(iconToday);
            console.log(tempToday);
            console.log(humToday);
            $("#current-city").text(newCity);
            $(".icon").attr("src", iconToday);
            $(".temp").text("Temperature: " + tempToday);
            $(".humidity").text("Humidity: " + humToday);
            $(".wind").text("Wind Speed: " + windToday);


        })
    }
        //display today temp info
        //display 5-Day forecast
});