// Import the express module
const express = require("express");
// Create the webserver
const app = express();
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Import the sanitizer module
const sanitize = require("sanitize");
// Import the CORS module
const cors = require("cors");
// Set up the CORS options to allow requests from our front-end
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
// Add the CORS middleware
app.use(cors(corsOptions));
// Create a variable to hold our port number
const port = process.env.PORT;
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
// Import the router
const router = require("./routes");
// Add the routes to the application as middleware
app.use(router);
// sample get
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
// Export the webserver for use in the application
module.exports = app;
