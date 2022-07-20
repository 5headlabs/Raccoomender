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

mongoose.connect(config.database);

app.use(cors());

let server;
if (process.env.NODE_ENV != config.test_env) {
  server = app.listen(config.port);
  console.log(`Your server is running on port ${config.port}.`);
} else{
  server = app.listen(config.test_port);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use("/api/auth",     authRouter);
app.use("/api/tutorial", tutorialRouter);

module.exports = server;