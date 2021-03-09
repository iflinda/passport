const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
  let name;
  const id = parseInt(profile.id)
  name = profile.username;
  console.log(profile)
  if (!userModel.findById(id)) {
    return userModel.addUser(id, name);
  } else {
    return userModel.findById(id)
  }
}

module.exports = {
  getUserByEmailIdAndPassword,
  getUserByGitHubIdOrCreate,
  getUserById,
};
