const jwt = require('jsonwebtoken');
const config = require('../config/main');

const Tutorial = require('../models/tutorial');

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

exports.updateTutorial = function (req, res, next) {

}

exports.getTutorial = function (req, res, next) {

}

exports.listTutorial = function (req, res, next) {
    /*Tutorial.count().exec(function (err, count) {

        const desiredCount = 5;
        const tutsToDisplay = (count < 5) ? count : desiredCount;
        const tutorials = [];

        for (let i = 0; i < tutsToDisplay; i++) {
            // Get a random entry
            var random = Math.floor(Math.random() * count);
            // Again query all users but only fetch one offset by our random #
            const tutorial = await Tutorial.findOne().skip(random);

            console.log(tutorial);
            if (tutorials.includes(tutorial)) {
                console.log("already in it");
                i--;
            } else {
                console.log("new entry");
                tutorials.push(tutorial);
            }
        }
        console.log("hm");
        res.status(200).send({ tutorialList: tutorials });
    })*/

    const tutorials = findRandom(2);

    tutorials.then((result)=>{
        res.status(200).send({ tutorialList: result });
    });
}

function findRandom(limit) {
    return new Promise(function (resolve, reject) {
        Tutorial.count({}, function (err, count) {
            let size = (count < limit) ? count : limit;
            let skip = Math.floor(Math.random() * count);
            Tutorial.find().skip(skip).limit(size).exec(function (err, docs) {
                if (err)
                    return reject(err);
                resolve(docs);
            });
        });
    });
}