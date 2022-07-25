function setUserInfo(request) {
    const getUserInfo = {
      _id:      request._id,
      username: request.username,
      email:    request.email,
      password: request.password,
      role:     request.role
    };
  
    return getUserInfo;
}

function getRole(roleToCheck) {
    return 1;
}

module.exports = { setUserInfo, getRole };