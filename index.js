require('dotenv').config();

// Importing Node modules and initializing Express
const express = require('express');
const app = express();

// Importing needed modules
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const config     = require('./config/main');
const logger     = require('morgan');
const cors       = require('cors');

// Routers
const authRouter     = require('./routes/authRouter');
const tutorialRouter = require('./routes/tutorialRouter');

mongoose.connect(config.database);

app.use(bodyParser.json());
app.use(logger('dev'));

app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// CORS
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Define routes and their handlers
app.use("/api/auth",     authRouter);
app.use("/api/tutorial", tutorialRouter);