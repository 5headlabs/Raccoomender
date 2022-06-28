const express = require("express");
const router = express.Router();

const tutorialController = require('../controllers/tutorialController');
const authController = require("../controllers/authController");

router.post("/create", authController.checkLoginStatus, tutorialController.createTutorial);
router.get("/list", tutorialController.listTutorial);

router.get("/view/:id", tutorialController.getTutorial);

router.post("/add/comment", authController.checkLoginStatus, commentController.addComment, tutorialController.addComment);


module.exports = router;