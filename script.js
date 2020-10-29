$(document).ready(function () {
    var apiKey = "aaf8eceac24449085c5be7ce04f1f018";

    $("#search").on("click", function () {
        var userInput = $("#cityName").val().trim();
        // the city from the textinput is added to our cities array shown above.
        console.log(cities);
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&units=imperial&appid=" + apiKey
            //this url is the current weather api
        }).then(function (response) {
            if (cities.indexOf(userInput) === -1) {
                cities.push(userInput);
                localStorage.setItem("cities", JSON.stringify(cities));
                renderCities(userInput);

            }
            var date = moment().format("MMM Do YYYY");

            //transfer content to html
            $(".name").html("<h1>" + response.name + "<h2>" + "<br>" + date + "</br>" + "</h2>" + "</h1>");
            $(".temp").html("<b>" + "Temperature: " + response.main.temp + " F ");
            $(".humidity").html("<b>" + "Humidity: " + response.main.humidity + " ");
            var humidity = $("<i>").attr("class", "fas fa-water");
            $(".humidity").append(humidity);
            $(".wind").html("<b>" + "Wind Speed: " + response.wind.speed + " ");
            var wind = $("<i>").attr("class", "fas fa-wind");
            $(".wind").append(wind);

            //getting the icon logo 
            var iconLogo = response.weather[0].icon;
            var icon = "http://openweathermap.org/img/wn/" + iconLogo + "@2x.png";
            var addIcon = $(".name"); //where the icon is going to go..next to city name and date
            var iconImg = $("<img>").attr("src", icon);
            addIcon.append(iconImg); //appending so it can show

            //lat & lon needed for UV INDEX
            var lat = JSON.stringify(response.coord.lat);
            var lon = JSON.stringify(response.coord.lon);

            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
                //url for UV index.
            }).then(function (uvResponse) {
                //printing to html:
                $(".uv").html("<b>" + "UV Index: " + uvResponse.value + " ");
                var uv = $("<i>").attr("class", "fas fa-sun");
                $(".uv").append(uv);

                if (uvResponse.value >= 1 && uvResponse.value < 3) {
                    $(".uv").css('background-color', 'green');
                }
                if (uvResponse.value >= 3 && uvResponse.value <= 6) {
                    $(".uv").css('background-color', 'yellow');
                }
                if (uvResponse.value >= 6 && uvResponse.value <= 8) {
                    $(".uv").css('background-color', 'orange');
                }
                if (uvResponse.value >= 8 && uvResponse.value <= 10) {
                    $(".uv").css('background-color', 'red');
                }
            })
        })
        //making another ajax call for 5 day weather forecast.
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + apiKey
            //this url is the 5 day forecast weather api
        }).then(function (forecastResponse) {
            for (var i = 0; i < 8; i++) {
                //substring grabs a string within a string..this case grabbing from 11..because I just want the afternoon.
                if ((forecastResponse.list[i].dt_txt).substring(11) === "12:00:00") {
                    $("#5dayCast").html("<h1>5 Day Forecast</h1>" + "<hr>"); //title
                    var date1 = [
                        {
                            date: ("<p>" + forecastResponse.list[i].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon1 = forecastResponse.list[0].weather[0].icon;
                    var fcIcon1 = "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png";
                    var addforecastIcon1 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg1 = $("<img>").attr("src", fcIcon1);
                    addforecastIcon1.append(iconImg1, date1[0].date, date1[0].temperature, date1[0].humidity);

                    var date2 = [
                        {
                            date: ("<p>" + forecastResponse.list[i + 8].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i + 8].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i + 8].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon2 = forecastResponse.list[i + 8].weather[0].icon;
                    var fcIcon2 = "http://openweathermap.org/img/wn/" + forecastIcon2 + "@2x.png";
                    var addforecastIcon2 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg2 = $("<img>").attr("src", fcIcon2);
                    addforecastIcon2.append(iconImg2, date2[0].date, date2[0].temperature, date2[0].humidity);

                    var date3 = [
                        {
                            date: ("<p>" + forecastResponse.list[i + 16].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i + 16].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i + 16].main.humidity + "<h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon3 = forecastResponse.list[i + 16].weather[0].icon;
                    var fcIcon3 = "http://openweathermap.org/img/wn/" + forecastIcon3 + "@2x.png";
                    var addforecastIcon3 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg3 = $("<img>").attr("src", fcIcon3);
                    addforecastIcon3.append(iconImg3, date3[0].date, date3[0].temperature, date3[0].humidity);

                    var date4 = [
                        {
                            date: ("<p>" + forecastResponse.list[i + 24].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i + 24].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i + 24].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon4 = forecastResponse.list[i + 24].weather[0].icon;
                    var fcIcon4 = "http://openweathermap.org/img/wn/" + forecastIcon4 + "@2x.png";
                    var addforecastIcon4 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg4 = $("<img>").attr("src", fcIcon4);
                    addforecastIcon4.append(iconImg4, date4[0].date, date4[0].temperature, date4[0].humidity);

                    var date5 = [
                        {
                            date: ("<p>" + forecastResponse.list[i + 32].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + forecastResponse.list[i + 32].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + forecastResponse.list[i + 32].main.humidity + "</h3>")
                        }
                    ];
                    var forecastIcon5 = forecastResponse.list[i + 32].weather[0].icon; //icon
                    var fcIcon5 = "http://openweathermap.org/img/wn/" + forecastIcon5 + "@2x.png"; //grabbing icon
                    var addforecastIcon5 = $("#5dayCast");
                    var iconImg5 = $("<img>").attr("src", fcIcon5);
                    addforecastIcon5.append(iconImg5, date5[0].date, date5[0].temperature, date5[0].humidity);
                }
            }
        });
    });
    //create another ajax call and separate functions for city buttons.
    function renderCities(city) { //function to get the value of city and append to city blocks.
        var li = $("<li>").addClass("list-group-item").attr("data-city", city).text(city);

        $("#cityList").append(li);


    }
    //function to grab THIS attr, whichever city is clicked on and then grab the info and display on html.
    //have to do the same for the 5 day weather forecast.
    function displayCityInfo(city) {
        //var city = $(this).text()
        //console.log("City " + city);
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey
        }).then(function (buttonResponse) {
            var date = moment().format("MMM Do YYYY"); //current date
            //printing to html
            $(".name").html("<h1>" + buttonResponse.name + "<h2>" + "<br>" + date + "</br>" + "</h2>" + "</h1>");
            $(".temp").html("<b>" + "Temperature: " + buttonResponse.main.temp + " F ");
            $(".humidity").html("<b>" + "Humidity: " + buttonResponse.main.humidity + " ");
            var humidity = $("<i>").attr("class", "fas fa-water");
            $(".humidity").append(humidity);
            $(".wind").html("<b>" + "Wind Speed: " + buttonResponse.wind.speed + " ");
            var wind = $("<i>").attr("class", "fas fa-wind");
            $(".wind").append(wind);

            //getting the icon logo 
            var iconLogo = buttonResponse.weather[0].icon;
            var icon = "http://openweathermap.org/img/wn/" + iconLogo + "@2x.png";
            console.log(iconLogo);
            var addIcon = $(".name"); //where the icon is g22oing to go..next to city name and date
            var iconImg = $("<img>").attr("src", icon);
            addIcon.append(iconImg); //appending so it can show

            //lat & lon needed for UV INDEX
            var lat = JSON.stringify(buttonResponse.coord.lat);
            var lon = JSON.stringify(buttonResponse.coord.lon);
            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
            }).then(function (fcUV) {
                //printing to html
                $(".uv").html("<b>" + "UV Index: " + fcUV.value + " ");
                var uv = $("<i>").attr("class", "fas fa-sun");
                $(".uv").append(uv);
                //do the if statementfcUVlor. ??
                if (fcUV.value >= 1 && fcUV.value < 3) {
                    $(".uv").css('background-color', 'green');
                }
                if (fcUV.value >= 3 && fcUV.value <= 6) {
                    $(".uv").css('background-color', 'yellow');
                }
                if (fcUV.value >= 6 && fcUV.value <= 8) {
                    $(".uv").css('background-color', 'orange');
                }
                if (fcUV.value >= 8 && fcUV.value <= 10) {
                    $(".uv").css('background-color', 'red');
                }
            });

        });//create another ajax call so that the 5day forecast changes when the user clicks a stored city button.
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey
        }).then(function (fcBtnResponse) {
            for (var i = 0; i < 8; i++) {

                if ((fcBtnResponse.list[i].dt_txt).substring(11) === "12:00:00") {
                    $("#5dayCast").html("<h1>5 Day Forecast</h1>" + "<hr>"); //title
                    var date1 = [
                        {
                            date: ("<p>" + fcBtnResponse.list[i].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + fcBtnResponse.list[i].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + fcBtnResponse.list[i].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon1 = fcBtnResponse.list[0].weather[0].icon;
                    var fcIcon1 = "http://openweathermap.org/img/wn/" + forecastIcon1 + "@2x.png";
                    var addforecastIcon1 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg1 = $("<img>").attr("src", fcIcon1);
                    addforecastIcon1.append(iconImg1, date1[0].date, date1[0].temperature, date1[0].humidity);

                    var date2 = [
                        {
                            date: ("<p>" + fcBtnResponse.list[i + 8].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + fcBtnResponse.list[i + 8].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + fcBtnResponse.list[i + 8].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon2 = fcBtnResponse.list[i + 8].weather[0].icon;
                    var fcIcon2 = "http://openweathermap.org/img/wn/" + forecastIcon2 + "@2x.png";
                    var addforecastIcon2 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg2 = $("<img>").attr("src", fcIcon2);
                    addforecastIcon2.append(iconImg2, date2[0].date, date2[0].temperature, date2[0].humidity);

                    var date3 = [
                        {
                            date: ("<p>" + fcBtnResponse.list[i + 16].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + fcBtnResponse.list[i + 16].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + fcBtnResponse.list[i + 16].main.humidity + "<h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon3 = fcBtnResponse.list[i + 16].weather[0].icon;
                    var fcIcon3 = "http://openweathermap.org/img/wn/" + forecastIcon3 + "@2x.png";
                    var addforecastIcon3 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg3 = $("<img>").attr("src", fcIcon3);
                    addforecastIcon3.append(iconImg3, date3[0].date, date3[0].temperature, date3[0].humidity);

                    var date4 = [
                        {
                            date: ("<p>" + fcBtnResponse.list[i + 24].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + fcBtnResponse.list[i + 24].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + fcBtnResponse.list[i + 24].main.humidity + "</h3>" + "<hr>")
                        }
                    ];
                    var forecastIcon4 = fcBtnResponse.list[i + 24].weather[0].icon;
                    var fcIcon4 = "http://openweathermap.org/img/wn/" + forecastIcon4 + "@2x.png";
                    var addforecastIcon4 = $("#5dayCast"); //where the icon is going to go.
                    var iconImg4 = $("<img>").attr("src", fcIcon4);
                    addforecastIcon4.append(iconImg4, date4[0].date, date4[0].temperature, date4[0].humidity);

                    var date5 = [
                        {
                            date: ("<p>" + fcBtnResponse.list[i + 32].dt_txt + "</p>"),
                            temperature: ("<h3>" + "Temperature: " + fcBtnResponse.list[i + 32].main.temp + " F " + "</h3>"),
                            humidity: ("<h3>" + "Humidity: " + fcBtnResponse.list[i + 32].main.humidity + "</h3>")
                        }
                    ];
                    var forecastIcon5 = fcBtnResponse.list[i + 32].weather[0].icon; //icon
                    var fcIcon5 = "http://openweathermap.org/img/wn/" + forecastIcon5 + "@2x.png"; //grabbing icon
                    var addforecastIcon5 = $("#5dayCast");
                    var iconImg5 = $("<img>").attr("src", fcIcon5);
                    addforecastIcon5.append(iconImg5, date5[0].date, date5[0].temperature, date5[0].humidity);
                }
            }
        });
    };
    // Adding click event listeners to all elements with an element of li aka the city blocks that will be clicked on.
    $("#cityList").on("click", "li", function () {
        displayCityInfo($(this).text());
    });
    var cities = JSON.parse(localStorage.getItem("cities")) || [];//empty array to hold the cities that the user will input.
    for (var i = 0; i < cities.length; i++) {
        renderCities(cities[i]);
    }
    if (cities.length > 0) {
        displayCityInfo(cities[cities.length - 1]);
    }
});



