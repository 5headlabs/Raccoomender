const Rating = require('../models/rating');

exports.createRating = function (req, res) {
    const rating = new Rating({
        owner: user._id,
        score: req.body.score
    });

    rating.save((err) => {
        if (err) { 
            res.status(500).send({error: "An error occurred whilst saving rating!"});
        }

        return rating;
    });
}

exports.updateRating = function (req, res, next) {

}

exports.getRating = function (req, res, next) {

}

exports.listRatings = function (req, res, next) {

}