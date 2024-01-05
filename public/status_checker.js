const axios = require('axios');

function checkServerStatus() {
  const serverUrl = 'http://localhost:3000'; // Update with your server details
  const statusEndpoint = `${serverUrl}/api/status`;

  axios.get(statusEndpoint)
    .then(response => {
      const serverStatus = response.data.isServerUp;
      console.log(`Server status: ${serverStatus ? 'Up' : 'Down'}`);
      // Handle the server status as needed
    })
    .catch(error => {
      console.error('Error checking server status:', error.message);
      // Handle the error, e.g., server is unreachable
    });
}

// Periodically check the server status
setInterval(checkServerStatus, 10000); // Check every 60 seconds
