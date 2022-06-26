const express = require("express");
const router = express.Router();

const tutorialController = require('../controllers/tutorialController');

router.post("/create", tutorialController.createTutorial);
router.get("/list", tutorialController.listTutorial);

router.get("/view/:id", tutorialController.getTutorial, tutorialController.showTutorial);


module.exports = router;