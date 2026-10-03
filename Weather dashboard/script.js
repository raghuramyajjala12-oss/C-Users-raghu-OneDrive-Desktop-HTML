async function getWeather() {
    const city = document.getElementById("city").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    try {
        // Find city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results) {
            alert("City not found");
            return;
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get real weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,visibility&timezone=auto`
        );

        const weatherData = await weatherResponse.json();
        const current = weatherData.current;

        // Display data
        document.getElementById("cityName").innerText =
            `${location.name}, ${location.country}`;

        document.getElementById("temperature").innerText =
            `${current.temperature_2m}°C`;

        document.getElementById("condition").innerText =
            "Current Weather";

        document.getElementById("icon").innerText = "🌤️";

        document.getElementById("humidity").innerText =
            `${current.relative_humidity_2m}%`;

        document.getElementById("wind").innerText =
            `${current.wind_speed_10m} km/h`;

        document.getElementById("pressure").innerText =
            `${current.surface_pressure} hPa`;

        document.getElementById("visibility").innerText =
            `${(current.visibility / 1000).toFixed(1)} km`;

    } catch (error) {
        alert("Unable to get weather data");
        console.log(error);
    }
}