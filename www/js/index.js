/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
    getWeatherAPI();
    displayInputText();
}

function displayInputText() {
    const textInput = document.getElementById('textInput');
        const output = document.getElementById('displayArea');

        // Get the button element
        const submitButton = document.getElementById('button-addon2');

        // Add an event listener to the button click
        submitButton.addEventListener('click', function() {
            // Get the typed text from the input field
            const typedText = textInput.value;

            // Display the typed text below the input
            output.textContent = `Typed Text: ${typedText}`;
        });

}

function getWeatherAPI() {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '0014c26b906953372b5996ff59eb4b9e';

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Create a request to the OpenWeatherMap API
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const weatherDiv = document.getElementById('weather');
                    weatherDiv.innerHTML = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
                })
                .catch(error => {
                    console.log('Error fetching weather data:', error);
                    document.getElementById('weather').textContent = "Error fetching weather data.";
                });
        },
            function (error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                    default:
                        console.log("An unknown error occurred.");
                }
            });
    } else {
        document.getElementById('weather').textContent = "Geolocation is not supported by this browser.";
    }
}