const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Redirect root to /home
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'categories.html'));
});

app.get('/policies', (req, res) => {
  res.sendFile(path.join(__dirname, 'policies.html'));
});

app.get('/maintenance', (req, res) => {
  const maintenanceFilePath = path.join(__dirname, 'maintenance.html');
  res.sendFile(maintenanceFilePath, (err) => {
    if (err) {
      console.error(`Error sending maintenance.html file:`, err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.get('/api/status', (req, res) => {
  const status = { isServerUp: true }; // Replace with your logic to check server status
  res.json(status);
});

app.get('/:page', (req, res) => {
  const page = req.params.page;

  // Construct the file path based on the page parameter
  const filePath = path.join(__dirname, page);
  console.log('Checking file path:', filePath);

  // Check if the file exists and has a .html or .css extension before sending it
  if (fs.existsSync(filePath) && (path.extname(filePath) === '.html' || path.extname(filePath) === '.css')) {
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending ${path.extname(filePath)} file:`, err);
        res.status(500).send('Internal Server Error');
      }
    });
  } else {
    console.error('Error: Page not found', filePath);
    res.status(404).send('Page not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
