// Get the current year dynamically
const currentYear = new Date().getFullYear();

// Populate the copyright year in the footer's first paragraph
document.getElementById('copyrightYear').textContent = currentYear;

// Get the last modified date of the document
const lastModifiedDate = document.lastModified;

// Populate the last modified date in the second paragraph
document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

// Function to increment and display the visit count
function incrementVisitCount() {
    // Check if a visit count is already stored in the session storage
    let visitCount = sessionStorage.getItem('visitCount');

    if (!visitCount) {
        // If not, initialize the count to 1
        visitCount = 1;
    } else {
        // If it exists, increment the count
        visitCount = parseInt(visitCount) + 1;
    }

    // Store the updated count in the session storage
    sessionStorage.setItem('visitCount', visitCount);

    // Display the visit count
    document.getElementById('visitCount').textContent = `Visits: ${visitCount}`;
}

// Call the function to increment and display the visit count
incrementVisitCount();

// Function to get the user's country
function getUserCountry() {
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const country = data.country; // Extract the country code (e.g., "US" for the United States)
        const countryName = "Ghana"; // Set the country name
  
        console.log("User's country:", countryName);
  
        // You can display the country name or perform other actions with it here
  
        // Call the function to get weather data
        getWeatherData(countryName);
      })
      .catch((error) => {
        console.error("Error fetching user's country:", error);
      });
  }
  
  // Function to get weather data
  function getWeatherData(countryName) {
    const apiKey = 'b5d0b39817509953f46b19c4d3fa36c7'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((weatherData) => {
        console.log("Weather data:", weatherData);
  
        // Extract weather information, e.g., temperature, description
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
  
        // Update the weather-data div with the information
        const weatherDiv = document.getElementById('weather-data');
        weatherDiv.innerHTML = `
          <h3>Weather Information for ${countryName}</h3>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
        `;
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
  
  // Call the function to get the user's country
  getUserCountry();
  