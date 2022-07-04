require('dotenv').config();

// Importing Node modules and initializing Express
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./config/main');
const logger     = require('morgan');
const cors       = require('cors');

const authRouter     = require('./routes/authRouter');
const tutorialRouter = require('./routes/tutorialRouter');

// Database Setup
mongoose.connect(config.database);


app.use(cors());

// Start the server
let server;
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
} else{
  server = app.listen(config.test_port);
}

// Set static file location for production
// app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api/auth"    , authRouter);
app.use("/api/tutorial", tutorialRouter);

// necessary for testing
module.exports = server;
