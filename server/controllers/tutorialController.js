const Tutorial          = require('../models/tutorial');
const User              = require('../models/user');
const ratingController  = require('./ratingController');
const commentController = require('./commentController');
const authController    = require('./authController');

const desiredTutorialListCount = 10;

// Handle Tutorial Creation and Display

exports.createTutorial = function (req, res, next) {

    const user = authController.verifyUser(req);

    const tutorial = new Tutorial({
        title  : req.body.title,
        owner  : user._id,
        content: req.body.content,
        tags   : req.body.tags
    });

    tutorial.save((err) => {
        if (err) {
            res.status(500).send({error: "Could not save tutorial!"});
        }

        res.status(201).send({ success: true });
    });
}

exports.addRating = function (req, res, next) {
    const rating = ratingController.createRating(req);

    // Check if rating already exists
    // if exist > update rating entry
    // if not   > add rating entry
    // avg rating: (avgRating + newRating) / (#ratings + 1)
}

exports.addComment = function (req, res, next) {
    const user       = authController.verifyUser(req);
    const comment    = commentController.createComment(req, user);
    const tutorialId = req.params.id;
    
}

exports.getTutorial = function (req, res, next) {
    Tutorial.findById({_id: req.params.id}).
        populate('owner').
        exec((err, tut) => {
            if (err) {
                res.status(500).send({error: "An error occurred during retrieval of tutorial!"});
            } else {
                res.status(200).send({tutorial: tut});
            }
    });
}

exports.listTutorial = async function (req, res, next) {
    const tutorials = findRandom(desiredTutorialListCount);

    tutorials.then((result)=>{
        res.status(200).send({ tutorialList: result });
    });
}

function findRandom(limit) {
    return new Promise((resolve, reject) => {
        Tutorial.count({}, (err, count) => {
            let size = (count < limit) ? count : limit;
            let skip = getRand(0, count - size);
            Tutorial.find()
                .populate({
                    path: 'owner',
                    options: {
                        skip: skip,
                        limit: size
                }})
                .exec((err, docs) => {
                    if (err) {
                        res.status(500).send({error: `An error occurred during retrieval of tutorial (Tutorial-ID: ${tut._id})!`});
                        return reject(err);
                    } else {
                        resolve(docs);
                    }
                });
        });
    });
}

function getRand(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}