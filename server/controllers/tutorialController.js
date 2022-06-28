const jwt = require('jsonwebtoken');
const config = require('../config/main');

const Tutorial = require('../models/tutorial');

const desiredTutorialListCount = 5;

// Handle Tutorial Creation and Display

exports.createTutorial = function (req, res, next) {

    const user = jwt.verify(req.get("token").split(' ')[1], config.secret);

    const tutorial = new Tutorial({
        title: req.body.title,
        owner: user._id,
        content: req.body.content,
        tags: req.body.tags
    });

    tutorial.save((err) => {
        if (err) { return next(err); }
        res.status(200).send({ success: true });
    });
}

exports.addRating = function (req, res, next) {

}

exports.addComment = function (req, res, next) {

}

exports.getTutorial = function (req, res, next) {

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
                resolve(docs);
            });
        });
    });
}

function getRand(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}