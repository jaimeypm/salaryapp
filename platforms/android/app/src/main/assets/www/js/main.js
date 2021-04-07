function getWeather(){

	// Load spinner
	$('.loader').addClass('loader');

	// Get location from IP API
	$.ajax({
	  dataType: "json",
	  url: "https://ipapi.co/json/",
	  success: function(data){

	    let lon = data.longitude;
	    let lat = data.latitude;
	    var key = '51ba4a709895fbaf7c1e75c836cc610c';
	    console.log(data);

	    // Get weather from openWeather
	    $.ajax("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + key + "&units=metric"
			).done(function(result){
				addToContainer(result);
				console.log(result);
			})
			.fail(function(xhr, status, error){
                    console.log('error:' + xhr.status);
            })
			.always(function(){
                // hide spinner 
                window.setTimeout(function(){
 					$('.loader').removeClass('loader');
                }, 500);
               
            })  
		}
	})
}

function addToContainer(data){

	// Change background depending on time of day
	var date = new Date();
	var h = date.getHours();
	var time = date.toLocaleTimeString();
	console.log(date, h,time);

		// Night  
		if(h <= 5 || h >= 18){
			var bg = document.querySelector('body');
			bg.classList.toggle('night');
			
		// Dawn 
		} else if(h >= 6 && h <= 8) {
			var bg = document.querySelector('body');
			bg.classList.toggle('dawn');

		// Dusk 
		} else if(h >= 17 && h <= 19) {
			var bg = document.querySelector('body');
			bg.classList.toggle('dusk');

		// Day 
		} else {
			var bg = document.querySelector('body');
			bg.classList.toggle('day');
		}

	var cTemp = parseInt(data.main.temp);
	var fTemp = parseInt(cTemp * 9 / 5 + 32);
	var city = data.name;
	var country = data.sys.country;
	var weatherID = data.weather[0].id;
	var weatherType = data.weather[0].description;
	var icon = data.weather[0].icon;
	
	// Select div to manipulate code
	var myContainer = document.querySelector('#container');

	console.log(cTemp, fTemp);

		// Div to hold weather information
		var box = document.createElement('div');
		box.classList.add('top');

		// Display icon that correlates with the current weather
		var pic = document.createElement('span');
		pic.classList.add('icon');
		pic.innerHTML = '<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png">';
		box.appendChild(pic);

		// Display celsius as default
		var temp = document.createElement('span');
		temp.classList.add('cTemp');
		temp.innerHTML = cTemp + '&deg' + '<span>C</span>';
		box.appendChild(temp);

		// Hide farenheit as default and add click event listener to toggle between celsius and farenheit
		var temp2 = document.createElement('span');
		temp2.classList.add('fTemp', 'display');
		temp2.innerHTML = fTemp + '&deg' + '<span>F</span>';
		box.addEventListener('click', event => {
			temp.classList.toggle('display');
			temp2.classList.toggle('display');
		});
		box.appendChild(temp2);

		// Display weather condition
		var weatherCon = document.createElement('span');
		weatherCon.classList.add('weatherCon');
		weatherCon.innerHTML = weatherType;
		box.appendChild(weatherCon);
		myContainer.appendChild(box);

		// Refresh button
		var reload = document.createElement('div');
		reload.classList.add('btn');
		reload.innerHTML = '<div onclick = "location.reload(true);""> Refresh </div>';
		box.appendChild(reload);

		// Show last updated time 
		var update = document.createElement('span');
		update.classList.add('update');
		update.innerHTML = '<br>' + 'Updated At: ' + time;
		box.appendChild(update);

		// Display location info
		var box2 = document.createElement('div');

		var location = document.createElement('span');
		location.classList.add('location');
		location.innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + city + ' , ' + country;
		box2.appendChild(location);
		myContainer.appendChild(box2);
	
}


