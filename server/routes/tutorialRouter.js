const express = require("express");
const router  = express.Router();

const tutorialController = require('../controllers/tutorialController');
const authController     = require("../controllers/authController");

router.post("/create", authController.checkLoginStatus, tutorialController.createTutorial);

router.get("/list", tutorialController.listTutorials);

router.get("/view/:id", tutorialController.getTutorial);

router.post("/:id/add/comment", authController.checkLoginStatus, tutorialController.addComment);
router.post("/:id/add/rating" , authController.checkLoginStatus, tutorialController.addRating);


module.exports = router;