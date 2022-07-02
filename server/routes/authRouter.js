const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController');
const passportService = require('../config/passport');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", passportService.authLogin, authController.login);

router.post("/register", authController.register);

router.get("/checkLogin", authController.isLoggedIn);

module.exports = router;