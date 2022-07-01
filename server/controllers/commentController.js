exports.createComment = function (req, user) {
    const comment = {
        author   : user._id,
        title    : req.body.title,
        content  : req.body.content,
        published: Date.now()
    };

    return comment;
}

exports.updateComment = function (req, res) {

}

exports.getComment = function (req, res) {

}

exports.listComments = function (req, res) {

}