exports.setUserInfo = function(request) {
    const getUserInfo = {
      _id     : request._id,
      username: request.username,
      email   : request.email,
      password: request.password,
      role    : request.role
    };
  
    return getUserInfo;
}

exports.getRole = function(checkRole) {
    return 1;
}