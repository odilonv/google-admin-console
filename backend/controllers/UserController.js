const UserService = require('../services/UserService');

const getUsers = async (req, res) => {
  try {
    const users = await UserService.getInitialUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
};