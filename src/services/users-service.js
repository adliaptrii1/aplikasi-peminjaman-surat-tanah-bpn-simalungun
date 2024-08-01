const User = require('../models/user');

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.getUsers = async () => {
  return await User.getAll();
};

exports.getUser = async (id) => {
  return await User.findById(id);
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (user) {
    return await user.update(userData);
  }
  return null;
};

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (user) {
    await user.destroy();
    return true;
  }
  return false;
};
