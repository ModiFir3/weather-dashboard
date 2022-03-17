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
                    console.log(oneCallApi)
                    console.log(data);
                    console.log(lat);
                    console.log(lon);
                    //save location to local storage
                    localStorage.setItem(locationId, location);

                    //daily weather
                    $('#cityname').text(data.name)
                    $('#temp').text('Temp: ' + data.main.temp);
                    $('#wind').text('Wind Speed: ' + data.wind.speed + 'MPH');
                    $('#humidity').text('Humidity: ' + data.main.humidity + '%');

                    //uv data
                    fetch(oneCallApi).then(function(response) {
                        console.log(response)
                    });
                    $('#UV-Index').text('UV Index: ');
                    
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
