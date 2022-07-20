function createComment (req, user) {
    const comment = {
        author:    user._id,
        title:     req.body.title,
        content:   req.body.content,
        published: Date.now()
    };

    return comment;
}

module.exports = { createComment };