const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;
const config = require('../config/main');

exports.checkLoginStatus = (req, res, next) => {
  const user = jwt.verify(req.get("token").split(' ')[1], config.secret);
  
  if (!user) {
    next();
  } else {
    res.status(401).send({error: "Login required to perform this action!"});
  }
}


// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: '24h'
  });
}

//========================================
// Login Route
//========================================
exports.login = function (req, res, next) {
  const userInfo = setUserInfo(req.user);
  console.log(userInfo);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};


//= =======================================
// Registration Route
//= =======================================
exports.register = function (req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  console.log(`Registering: ${username}, ${password}, ${email}`);

  User.findOne({ username }, (err, existingUser) => {
    if (err) {
      return res.status(500).send({ error: "Could not find user!"});
    }

    // If user is not unique, return error
    if (existingUser) {
      return res.status(422).send({ error: 'That username is already in use.' });
    }

    // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
      username
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ error: "Could not save user after registration!"});
      }

      // Respond with JWT if user was created
      const userInfo = setUserInfo(user);

      res.status(201).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};