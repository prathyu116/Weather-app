let key = "c4cdf40f391909ec354928f6d7d351d1";

let container = document.querySelector("#container");

async function getWeatherData() {
  try {
    let city = document.querySelector("#city").value; //accepting data

    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    );

    let data = await res.json();
    let res2=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude={daily}&appid=${key}`)
    let res2Data = await res2.json()
    console.log("Data",res2Data)
    showDailyData(res2Data)

    showWeather(data);
  } catch (err) {
    console.log(err);
  }
}
let iframe = document.querySelector("#gmap_canvas");

//for any city , i should be able to get its weather
// data.Main.

function showWeather(data) {
  console.log(data);

  container.innerHTML = null;
  iframe.src = "";
  let country = document.createElement("p");
  country.textContent = `Country : ${data.sys.country}`;

  let name = document.createElement("p");
  name.textContent = `City : ${data.name}`;

  let feelslike = document.createElement("p");
  feelslike.textContent = `Feels like : ${data.main.temp_min}°C`;

  let temp = document.createElement("p");
  temp.textContent = `Min temp: ${data.main.temp_min} °C  Max temp: ${data.main.temp_max} °C`;

  let clouds = document.createElement("p");
  clouds.textContent = `Clouds : ${data.clouds.all} %`;

  let wind = document.createElement("p");
  wind.textContent = ` Wind speed :  ${data.wind.speed} m/s  deg-  ${data.wind.deg} °`;

  let humidity = document.createElement("p");
  humidity.textContent = `Humidity :  ${data.main.humidity}`;

  let pressure = document.createElement("p");
  pressure.textContent = `Pressure : ${data.main.pressure}`;

  var timestamp = data.sys.sunrise;
  var rise = new Date(timestamp);
  var sunrise = rise.getHours() + ":" + "0" + rise.getMinutes();
  console.log(sunrise);

  var timestamp = data.sys.sunset;
  var set = new Date(timestamp);
  var sunset = set.getHours() + ":" + "0" + set.getMinutes();
  console.log(sunset);

  let sys = document.createElement("p");
  sys.textContent = `Sunrise -  ${sunrise} Am  Sunset - ${sunset} Pm`;

  iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  container.append(
    country,
    name,
    feelslike,
    temp,
    clouds,
    wind,
    pressure,
    humidity,
    sys
  );
}

function showDailyData(dailyData){
  console.log("daaaaaaaailyyyyyyyydataaaaa",dailyData)
  // console.log("dailyData.daily.weather[0].icon",dailyData.weather[0].icon)

  var container=document.getElementById("nextSevendaysContainer")
  // var arr=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
  for(var i=0;i<8;i++){
    var div=document.createElement("div")
    var day=document.createElement("h3")
    var dayname = new Date(dailyData.daily[i].dt * 1000).toLocaleDateString("en", { weekday: "long"});
    day.textContent=dayname
    var img=document.createElement("img")
    img.src=`http://openweathermap.org/img/wn/${dailyData.daily[i].weather[0].icon}@2x.png`

    var maxtemp=document.createElement("h2")
    maxtemp.textContent=(dailyData.daily[i].temp.max-273.15).toFixed(2)+"°C"
    
    var mintemp=document.createElement("h3")
    mintemp.textContent=(dailyData.daily[i].temp.min-273.15).toFixed(2)+"°C"

    div.append(day,img,maxtemp,mintemp)
    container.append(div)
    
  }
}