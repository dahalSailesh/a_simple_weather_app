
let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let humidity = document.querySelector(".humidity");
let faren = true;

function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

function toCelcius(temperature){
    return (temperature - 32) * (5/9);
    
}

function cropTime(timeZ){
    var index = 0
    for(let i = 0; i< timeZ.length; i++)
    if(timeZ[i-1] == "/")
    index = i;
    return timeZ.substring(index);
}

function loadApp(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/878957045f3cefbcf35ffd025d55ae09/${lat},${long}`;

        fetch(api)
            .then(response =>{
                return response.json(); 
            })
            .then(data =>{ 
                const temperature = data.currently.temperature
                const summary = data.currently.summary
                const icon = data.currently.icon
                const timeZ = data.timezone;
                const hum = data.currently.humidity;

                temperatureDegree.textContent = temperature + " F";
                tempC = toCelcius(temperature);

                temperatureDegree.addEventListener("click", function(){
                    if(faren){
                        temperatureDegree.textContent = Math.floor(tempC) + " C";
                        faren = false;
                    }
                    else{
                        temperatureDegree.textContent = temperature + " F";
                        faren = true;
                    }
                });

                temperatureDescription.textContent = summary;
                locationTimezone.textContent = cropTime(timeZ);
                humidity.textContent = hum*100 + "%";
                setIcons(icon, document.querySelector(".icon"));
            });
        });
    }
}

loadApp();
