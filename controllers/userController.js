function setUserInfo(request) {
    const getUserInfo = {
      _id:      request._id,
      username: request.username,
      email:    request.email,
      password: request.password,
    };
  
    return getUserInfo;
}

module.exports = { setUserInfo };