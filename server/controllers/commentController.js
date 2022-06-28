const Comment = require('../models/comment');

exports.createComment = function (req, res) {
    const comment = new Comment({
        owner: user._id,
        title: req.body.title,
        content: req.body.content
    });

    comment.save((err) => {
        if (err) { 
            res.status(500).send({error: "An error occurred whilst saving comment!"});
        }
        
        return comment;
    });
}

exports.updateComment = function (req, res) {

}

exports.getComment = function (req, res) {

}

exports.listComments = function (req, res) {

}