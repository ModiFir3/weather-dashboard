var apiKey = "f31a9d61dacf5cd49a41c23a8bd6acbf";

//clicked on submit button and push value to weather report
$("#userSubmit").on("click", function () {
    var location = $("#userInput").val();
    if (location) {
        weatherReport(location)
    }else {
        //invalid input
        alert("Please Enter a Valid City!");
    }
});

//weather report
var weatherReport = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&daily.uvi&appid=" + apiKey;
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
                localStorage.setItem(locationId, city);
                

                //daily weather
                $('#cityname').text(data.name)
                $('#weathericon').attr('src', 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
                $('#temp').text(data.main.temp + 'F');
                $('#wind').text(data.wind.speed + 'MPH');
                $('#humidity').text(data.main.humidity + '%');
                $('#weather-date').text(new Date(data.dt * 1000).toLocaleDateString("en-US"));
                //uv data
                fetch(oneCallApi).then(function (resp) {
                    resp.json().then(function (data) {

                        //color index for UV 
                        if (data.daily[0].uvi < 3) {
                            $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-success rounded')
                        } else if (data.daily[0].uvi > 3 && data.daily[0].uvi < 6) {
                            $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-primary rounded')
                        } else if (data.daily[0].uvi > 6 && data.daily[0].uvi < 8) {
                            $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-warning rounded')
                        } else {
                            $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-danger rounded')
                        }
                        console.log(data)
                        //5 day forcast
                        for (i = 0; i < data.daily.length; i++) {
                            $('.forcast-icon').eq(i).attr('src', 'http://openweathermap.org/img/wn/'+ data.daily[i].weather[0].icon + '.png');
                            $('.forcast-temp').eq(i).text(data.daily[i].temp.day + 'F');
                            $('.forcast-wind').eq(i).text(data.daily[i].wind_speed + 'MPH');
                            $('.forcast-humidity').eq(i).text(data.daily[i].humidity + '%');
                            $('.date').eq(i).text(new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US"))
                        }
                    });
                });
            });
        } else {  
        }
    })
}

//clicked on dynamically created items and push that value up
$('.city').on('click', function(event) {
    var clickedInput = event.target.innerHTML;
    if (clickedInput) {
        weatherReport(clickedInput)
    }
});

//pull from local storage and view items on html
function history() {
    for (i = 0; i < localStorage.length; i++) {
        var city = localStorage.getItem(localStorage.key(i));
        var cityBtn = document.createElement('button');
        var recentSearch = document.querySelector('.city');
        recentSearch.appendChild(cityBtn);
        cityBtn.classList.add('city-button');
        cityBtn.innerHTML = city;
    }
}

history()