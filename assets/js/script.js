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

                    var oneCallApi = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon +'&appid=' + apiKey
                    console.log(data);
                    console.log(lat);
                    console.log(lon);
                    //save location to local storage
                    localStorage.setItem(locationId, location);

                    //daily weather
                    $('#cityname').text(data.name)
                    $('#temp').text(data.main.temp + 'F');
                    $('#wind').text(data.wind.speed + 'MPH');
                    $('#humidity').text(data.main.humidity + '%');

                    //uv data
                    fetch(oneCallApi).then(function(resp) {
                        resp.json().then(function(data) {
                            console.log(data.daily[0].uvi);
                            console.log(data.daily[0]);
                            //color index for UV 
                            if (data.daily[0].uvi < 2) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-success rounded')
                            } else if (data.daily[0].uvi > 2 && data.daily[0].uvi <= 5) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-primary rounded')
                            } else if (data.daily[0].uvi > 5 && data.daily[0].uvi <= 7 ) {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-warning rounded')
                            } else {
                                $('#UV-Index').text(data.daily[0].uvi).removeClass().addClass('bg-danger rounded')
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




