const jwt         = require('jsonwebtoken');
const User        = require('../models/user');
const setUserInfo = require('./userController').setUserInfo;
const config      = require('../config/main');

// CHeck whether a valid JWT token was provided
function verifyUser(req) {
  return jwt.verify(req.get("token").split(' ')[1], config.secret);
}

// Check if user is logged in by verifying provided JWT token.
function isLoggedIn(req, res) {
  try {
    const user = jwt.verify(req.get("token").split(' ')[1], config.secret);

    if(user) {
      res.status(200).send({ isLoggedIn: true });
    } else {
      res.status(200).send({ isLoggedIn: false });
    }
  } catch {
    res.status(200).send({ isLoggedIn: false });
  }
}

// Middleware is applied when accessing route where being logged in is required.
function checkLoginStatus (req, res, next) {
  const user = jwt.verify(req.get("token").split(' ')[1], config.secret);
  
  if (user) {
    next();
  } else {
    res.status(401).send({ error: "Login required to perform this action!" });
  }
}

// Generate JWT token.
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: '24h'
  });
}

// Login user after successful authontication.
function login(req, res, next) {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};

// Register new user after checking provided credentials.
function register(req, res, next) {
  const email    = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username}, (err, existingUser) => {
    if (err) {
      return res.status(500).send({ error: "Could not find user!" });
    }

    if (existingUser) {
      return res.status(422).send({ error: 'That username is already in use.' });
    }

    const user = new User({
      email,
      password,
      username
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ error: "Could not save user after registration!", message: err });
      } else {
        const userInfo = setUserInfo(user);
  
        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user:  userInfo
        });
      }
    });
  });
};

module.exports = { checkLoginStatus, login, register, verifyUser, isLoggedIn };