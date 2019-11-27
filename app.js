window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");


    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/53568d6e0158891d12095cff7831e4e0/${lat},${long}`;

            //---------
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                    const {temperature, summary, icon} = data.currently;
                    // Set DOM elements 
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                        // Formula for Conversion
                        let celcius = (temperature - 32) * (5/9);

                        // Set Icon
                        setIcons(icon, document.querySelector(".icon"));
                        // Change temperature to Celcius/Farenheit
                        temperatureSection.addEventListener("click", () => {
                            if(temperatureSpan.textContent === 'F'){
                                temperatureSpan.textContent = 'C';
                                temperatureDegree.textContent = Math.floor(celcius);
                            }  
                            else {
                                temperatureSpan.textContent = 'F';
                                temperatureDegree.textContent = temperature; 
                            }
                                
                        });
                });

        });
   
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({"color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.add(iconID, Skycons[currentIcon]);
    }

});