if (navigator.geolocation) {

	//fail timeout
    var location_timeout = setTimeout("geolocFail()", 10000);

    //get location
    navigator.geolocation.getCurrentPosition(function(position) {

        clearTimeout(location_timeout);

        //location
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        //html
        var location = document.getElementById('location');
		var weather = document.getElementById('weather');

        //api url
        var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=2de143494c0b295cca9337e1e96b00e0';
		
		//get weather
		var api = $.getJSON(url)

		//write
		api.complete(function() {
		  weather.innerHTML = JSON.parse(api.responseText).weather[0].main;
		  location.innerHTML = JSON.parse(api.responseText).name;
		});

    }, function(error) {
        clearTimeout(location_timeout);
        geolocFail();
    });
} else {
    geolocFail();
}


