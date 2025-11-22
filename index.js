// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const input = document.querySelector('input[placeholder="Enter state abbreviation"]');
  const button = document.querySelector('button');
  const alertsDisplay = document.querySelector('#alerts-display');
  const errorDiv = document.querySelector('#error-message');
  
  // Step 1: Fetch function
  function fetchWeatherAlerts(state) {
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
      .then(response => response.json())
      .then(data => {
        // Step 4: Clear any previous errors (on success)
        errorDiv.textContent = '';
        errorDiv.classList.add('hidden');
        
        // Step 2: Display the alerts
        displayAlerts(data);
      })
      .catch(error => {
        // Step 4: Show error message
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('hidden');
      });
  }
  
  // Step 2: Display function
  function displayAlerts(data) {
    const title = data.title;
    const count = data.features.length;
    
    // Build the HTML
    let html = `${title}: ${count}<br>`;
    
    data.features.forEach(feature => {
      html += `${feature.properties.headline}<br>`;
    });
    
    alertsDisplay.innerHTML = html;
  }
  
  // Add event listener to button
  button.addEventListener('click', () => {
    const state = input.value;
    
    // Fetch the weather alerts
    fetchWeatherAlerts(state);
    
    // Step 3: Clear the input field
    input.value = '';
  });
});