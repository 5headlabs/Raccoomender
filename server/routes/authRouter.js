const express = require("express");
const router = express.Router();

const passport = require('passport');
const authController = require('../controllers/authController');
const passportService = require('../config/passport');

const requireLogin = passport.authenticate('local', { session: false });

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/login", (req, res) => { res.send("LOGIN"); });
router.post("/login", requireLogin, authController.login);

router.get("/register", (req, res) => { res.send("REGISTER"); });
router.post("/register", authController.register);


module.exports = router;