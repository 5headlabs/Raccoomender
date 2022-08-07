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
app.use(express.static('public'));

app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// CORS
app.use(cors());

// Define routes and their handlers
app.use("/api/auth",     authRouter);
app.use("/api/tutorial", tutorialRouter);