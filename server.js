const express = require('express');
const app = express();
const port = 3000;

// Import the routes
const routes = require('./routes');

// Use the routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});