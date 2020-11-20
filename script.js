// JavaScript function that wraps everything
$(document).ready(function () {
  var citiesSearched = [];
  var newCity = "";
  APIKey = "9d8f90492517a80c2e29ed9275d65abe";
  //when clicked search button
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    //get user's city search input
    newCity = $("#city-input").val().trim();
    //alert if input is empty
    if (!newCity) {
      alert("City input cannot be empty. Please enter a city name");
    }
    //add new city to citiesSearched array if a city is entered
    else {
      citiesSearched.unshift(newCity);
      //call addSearchedCity function to add city to cities-searched div
      addSearchCity();
    }
    //call todayWeather function to display today's weather in today-weather-container div
    todayWeather();
    $("#right-container").removeClass("hide");
    forecastWeather();
    clickcities();
  });

  //function that add the most recently searched cities to the cities-searched div
  function addSearchCity() {
    $("#cities-searched").empty();
    for (var i = 0; i < citiesSearched.length; i++) {
      var a = $("<div>");
      a.addClass("new-city-searched border rounded");
      a.text(citiesSearched[i]);
      $("#cities-searched").append(a);
    }
  }
  //todayWeather function that display current weather
  function todayWeather() {
    //call ajax to pull current weather object
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        newCity +
        "&appid=" +
        APIKey,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //store date, icon, temperature, feels, humidity, windspeed into variable
      var dateToday = moment().format("l");
      var iconToday =
        "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
      var tempToday =
        Math.round(
          ((parseInt(response.main.temp) - 273.15) * (9 / 5) + 32) * 10
        ) /
          10 +
        " \u00B0F";
      var feelToday =
        Math.round(
          ((parseInt(response.main.feels_like) - 273.15) * (9 / 5) + 32) * 10
        ) /
          10 +
        " \u00B0F";
      var humToday = response.main.humidity + "%";
      var windToday =
        Math.round(parseInt(response.wind.speed) * 2.2369 * 10) / 10 + " MPH";
        //display variables to html div
      $("#current-city").text(newCity);
      $(".date").text(dateToday);
      $(".icon").attr("src", iconToday);
      $(".temp").text("Temperature: " + tempToday);
      $(".feels").text("Feels like: " + feelToday);
      $(".humidity").text("Humidity: " + humToday);
      $(".wind").text("Wind Speed: " + windToday);
    });
  }
  // function forecaseWeather that display weather for the future 5 days
  function forecastWeather() {
    //empty previous displays to prevent repetition
    $("#forcast-contianer").empty();
    //call ajax to get forecast for 5 days
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        newCity +
        "&appid=" +
        APIKey,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      //count days variable
      var dayCount = 1;
      //add divs for each day
      for (var i = 0; i < response.list.length; i++) {
        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          //add div for each day
          var b = $("<div>");
          b.addClass(
            "forecast-day bg-primary float-left rounded mr-4 text-white pt-2 pl-2 pr-4"
          );
          b.append("<h5 class='date-fore'></h5>");
          b.append("<img class='icon-fore'>");
          b.append("<h5 class='temp-fore'></h5>");
          b.append("<h5 class='hum-fore'></h5>");
          //display weather info for each day
          $("#forcast-contianer").append(b);
          $(".date-fore").text(moment().add(dayCount, "day").format("l"));
          var iconFore =
            "http://openweathermap.org/img/wn/" +
            response.list[i].weather[0].icon +
            ".png";
          $(".icon-fore").attr("src", iconFore);
          $(".temp-fore").text(
            Math.round(
              ((parseInt(response.list[i].main.temp) - 273.15) * (9 / 5) + 32) *
                10
            ) /
              10 +
              " \u00B0F"
          );
          $(".hum-fore").text(response.list[i].main.humidity + "%");
          dayCount += 1;
        }
      }
    });
  }
  //function clickcities that make the searched cities clickable
  function clickcities() {
    //store cities searched in an array
    var clickCity = document.querySelectorAll(".new-city-searched");
    for (var j = 0; j < clickCity.length; j++) {
      //when click each city searched display today weahter and display forcast
      clickCity[j].addEventListener("click", function (addEventListener) {
        newCity = event.target.textContent;
        todayWeather();
        forecastWeather();
      });
    }
  }
});
