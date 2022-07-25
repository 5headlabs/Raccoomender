const Rating = require('../models/rating');

function createRating (user, req, res) {
    return new Promise((resolve, reject) => {
        Rating
        .findOneAndUpdate(
            {owner: user._id, tutorial: req.params.id}, 
            {score: req.body.score}, 
            {new: true, upsert: true})
        .exec((err, rating) => {
            if (err) {
                res.status(500).send({ error: "An error occurred during update of rating!" });
                return reject(err);
            } else {
                resolve(rating);
            }
        });
    });
}

module.exports = { createRating };