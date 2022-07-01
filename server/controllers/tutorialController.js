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
    const comment = commentController.createComment(req);

    // Check if comment already exists
    // if exist > update comment entry
    // if not   > add comment entry
}

exports.getTutorial = function (req, res, next) {
    Tutorial.findById(req.params.id, (err1, tut) => {
        if (err1) {
            res.status(500).send({error: "An error occurred during retrieval of tutorial!"});
        } else {
            User.findById(tut.owner, (err2, resOwner) => {
                if (err2) {
                    res.status(500).send({error: "An error occurred during retrieval of tutorial!"});
                } else {
                    // Also return different star ratings (avg-rating is contained in tutorial)
                    res.status(200).send({tutorial: tut, ownerName: resOwner.userame});
                }
            });
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
            Tutorial.find().skip(skip).limit(size).exec(function (err, docs) {
                if (err)
                    return reject(err);
                resolve(docs).then((tut) => {
                    User.findById(tut.owner, (err2, resOwner) => {
                        if (err2) {
                            res.status(500).send({error: `An error occurred during retrieval of tutorial (Tutorial-ID: ${tut._id})!`});
                        } else {
                            return {tutorial: tut, ownerName: resOwner.userame};
                        }
                    });
                });                    
            });
        });
    });
}

function getRand(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}