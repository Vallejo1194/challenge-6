var inputCitybtn = document.querySelector('#city-information');
var cityInput = document.querySelector('#cityInput');
var currentTitle = document.getElementById('currentTitle');
var currentIcon = document.getElementById('currentIcon');
var currentTemp = document.getElementById('currentTemp');
var currentWind= document.getElementById('currentWind');
var currentHumidity = document.getElementById('currentHumidity');
var currentUVI = document.getElementById('currentUVI');
var historySearch = document.getElementById('history');



//  vars for forecast




var date1 = document.getElementById('date1');
var icon1 = document.getElementById('icon1');
var temp1 = document.getElementById('temp1');
var wind1 = document.getElementById('wind1');
var hum1 = document.getElementById('hum1');



var date2 = document.getElementById('date2');
var icon2 = document.getElementById('icon2');
var temp2 = document.getElementById('temp2');
var wind2 = document.getElementById('wind2');
var hum2 = document.getElementById('hum2');

var date3 = document.getElementById('date3');
var icon3 = document.getElementById('icon3');
var temp3 = document.getElementById('temp3');
var wind3 = document.getElementById('wind3');
var hum3 = document.getElementById('hum3');

var date4 = document.getElementById('date4');
var icon4 = document.getElementById('icon4');
var temp4 = document.getElementById('temp4');
var wind4 = document.getElementById('wind4');
var hum4 = document.getElementById('hum4');

var date5 = document.getElementById('date5');
var icon5 = document.getElementById('icon5');
var temp5 = document.getElementById('temp5');
var wind5 = document.getElementById('wind5');
var hum5 = document.getElementById('hum5');



var apiId = '6b131548fcfbbe2f1ac974efbde45028';




// City and button creation 

var informationSubmit = function (event) {
    event.preventDefault();
  
    var city = cityInput.value.trim();
    var newButton = document.createElement('button');
    newButton.textContent = city;
    newButton.setAttribute('class' , 'btn btn-secondary col-12 m-2');
    newButton.setAttribute('data-city' , city);

    historySearch.appendChild(newButton);

    if (city) {
      actualConditions(city);
        console.log('Good');

       
    } else {
      alert('No city found');
    }
   
};



// get city name

var submitButtonOnclick = function (event) {
    var city = event.target.getAttribute('data-city');
  
    if (city) {
      actualConditions(city);

    }
  };


  // API fetch for current conditions, display them and get LAT and LON for second API with UVI and forecast

  // Fetching current conditions, and coordinates for UVI 
function actualConditions(city) {

  var requestUrl ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiId ;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // // Response
        console.log(data);
        
        currentIcon.setAttribute('src', "http://openweathermap.org/img/wn/" + data.weather[0].icon +".png")
        var todayDate = moment.unix(data.dt).format("MMM Do, YYYY");
        currentTitle.textContent = city + ' ' + todayDate;
        currentTemp.textContent = 'Temp: ' +data.main.temp + '°C';
        currentWind.textContent = 'Wind: ' +data.wind.speed + 'km/h';
        currentHumidity.textContent = 'Humidity: ' +data.main.humidity + '%';

        var lat = data.coord.lat;
        var lon = data.coord.lon;

        secondAPI(lat,lon);
      });    
}


// Second API to request UVI and forecast and display them
function secondAPI(lat , lon) {
  var requestSecondUrl = "https://api.openweathermap.org/data/3.0/onecall?lat=" +lat+ "&lon=" +lon+ "&exclude=hourly,minutely&units=metric&appid=" +apiId;

  fetch(requestSecondUrl)
  .then(function(secondResponse) {
      return secondResponse.json();
  })
  .then(function(secondData){
      console.log(secondData);
      currentUVI.textContent = 'UV Index: ' +secondData.current.uvi;
      // UVI 
      if (secondData.current.uvi < 2) {
        currentUVI.setAttribute('class' , 'badge badge-success')
      } else if (secondData.current.uvi > 8) {
        currentUVI.setAttribute('class' , 'badge badge-danger')
      } else { currentUVI.setAttribute('class' , 'badge badge-warning') }


      console.log(secondData.daily[0]);
      console.log(secondData.daily[0].temp.day);
      console.log(secondData.daily[0].wind_speed);
      console.log(secondData.daily[0].weather[0].icon);
      console.log(secondData.daily[0].humidity);
      
      
      var dateFor1 = moment.unix(secondData.daily[1].dt).format("MMM/D/YYYY");
      console.log(dateFor1);
      date1.textContent = dateFor1;
      icon1.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[1].weather[0].icon +".png");
      temp1.textContent = 'Temp:' + secondData.daily[1].temp.day + '°C'; 
      wind1.textContent = 'Wind: ' + secondData.daily[1].wind_speed + 'km/h';
      hum1.textContent = 'Humidity: ' +secondData.daily[1].humidity +'%';

      var dateFor2 = moment.unix(secondData.daily[2].dt).format("MMM/D/YYYY");
      console.log(dateFor2);
      date2.textContent = dateFor2;
      icon2.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[2].weather[0].icon +".png");
      temp2.textContent = 'Temp:' + secondData.daily[2].temp.day + '°C'; 
      wind2.textContent = 'Wind: ' + secondData.daily[2].wind_speed + 'km/h';
      hum2.textContent = 'Humidity: ' +secondData.daily[2].humidity +'%';

      var dateFor3 = moment.unix(secondData.daily[3].dt).format("MMM/D/YYYY");
      console.log(dateFor3);
      date3.textContent = dateFor3;
      icon3.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[3].weather[0].icon +".png");
      temp3.textContent = 'Temp:' + secondData.daily[3].temp.day + '°C'; 
      wind3.textContent = 'Wind: ' + secondData.daily[3].wind_speed + 'km/h';
      hum3.textContent = 'Humidity: ' +secondData.daily[3].humidity +'%';
      
      var dateFor4 = moment.unix(secondData.daily[4].dt).format("MMM/D/YYYY");
      console.log(dateFor4);
      date4.textContent = dateFor4;
      icon4.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[4].weather[0].icon +".png");
      temp4.textContent = 'Temp:' + secondData.daily[4].temp.day + '°C'; 
      wind4.textContent = 'Wind: ' + secondData.daily[4].wind_speed + 'km/h';
      hum4.textContent = 'Humidity: ' +secondData.daily[4].humidity +'%';

      var dateFor5 = moment.unix(secondData.daily[5].dt).format("MMM/D/YYYY");
      console.log(dateFor5);
      date5.textContent = dateFor5;
      icon5.setAttribute('src', "http://openweathermap.org/img/wn/" + secondData.daily[5].weather[0].icon +".png");
      temp5.textContent = 'Temp:' + secondData.daily[5].temp.day + '°C'; 
      wind5.textContent = 'Wind: ' + secondData.daily[5].wind_speed + 'km/h';
      hum5.textContent = 'Humidity: ' +secondData.daily[5].humidity +'%';
  
  })
return;
}


// Event Listeners

inputCitybtn.addEventListener('submit', informationSubmit);
historySearch.addEventListener('click', submitButtonOnclick);