const User = require('../models/User');

const getInitialUsers = async () => {
  let users = await User.find({}).sort({ id: 1 });

  if (users.length === 0) {
    console.log("Populating database with 20 mock users...");
    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 5 === 0 ? 'Admin' : 'User'
    }));
    await User.insertMany(mockUsers);
    users = await User.find({}).sort({ id: 1 });
  }

  return users;
};

module.exports = {
  getInitialUsers,
};