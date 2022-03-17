var apiKey = "f31a9d61dacf5cd49a41c23a8bd6acbf";

//clicked on submit button
$("#userSubmit").on("click", function () {
    var location = $("#userInput").val();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&daily.uvi&appid=" + apiKey;

    //fetch openweather api
    fetch(apiUrl)
        .then(function (response) {
            //response comes back okay
            if (response.ok) {
                response.json().then(function (data) {
                    var locationId = data.id;
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey
                    //save location to local storage
                    localStorage.setItem(locationId, location);

                    //daily weather
                    $('#cityname').text(data.name)
                    $('#weathericon').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
                    $('#temp').text(data.main.temp + 'F');
                    $('#wind').text(data.wind.speed + 'MPH');
                    $('#humidity').text(data.main.humidity + '%');

                    //uv data
                    fetch(oneCallApi).then(function (resp) {
                        resp.json().then(function (data) {

                            console.log(data);

                            //color index for UV 
                            if (data.daily[0].uvi < 2) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-success rounded')
                            } else if (data.daily[0].uvi > 3 && data.daily[0].uvi < 6) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-primary rounded')
                            } else if (data.daily[0].uvi > 6 && data.daily[0].uvi < 8) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-warning rounded')
                            } else {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-danger rounded')
                            }

                            //5 day forcast
                            for (i = 0; i < data.daily.length; i++) {
                                $('.forcast-icon').eq(i).attr('src', 'http://openweathermap.org/img/wn/'+ data.daily[i].weather[0].icon + '.png');
                                $('.forcast-temp').eq(i).text(data.daily[i].temp.day + 'F');
                                $('.forcast-wind').eq(i).text(data.daily[i].wind_speed + 'MPH');
                                $('.forcast-humidity').eq(i).text(data.daily[i].humidity + '%');
                            }

                        });
                    });

                });
            } else {
                //invalid input
                alert("Please Enter a Valid City!");
            }
        })
        //catch error
        .catch(() => {
            alert("Please Enter a Valid City!");
        });
});




