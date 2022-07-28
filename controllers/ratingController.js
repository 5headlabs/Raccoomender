const Rating = require('../models/rating');

// Either
//   - creates a new rating if user did not rate tutorial yet
//   - overwrites old rating if user already rated the tutorial
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