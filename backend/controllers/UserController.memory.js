/**
 * Alternative controller using in-memory service
 */

const UserService = require('../services/UserService.memory');

// Endpoint: GET /api/users
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
