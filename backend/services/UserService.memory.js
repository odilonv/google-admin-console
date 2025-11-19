/**
 * Alternative version of UserService
 * Uses in-memory database instead of MongoDB
 * Useful for testing or if MongoDB is not available
 */

// Simulate an in-memory database
let mockDatabase = [];

const getInitialUsers = async () => {
  // If the "database" is empty, populate it with 20 mock users
  if (mockDatabase.length === 0) {
    console.log("Populating in-memory database with 20 mock users...");
    mockDatabase = Array.from({ length: 20 }, (_, i) => ({
      _id: `mock_id_${i + 1}`,
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 5 === 0 ? 'Admin' : (i % 3 === 0 ? 'Guest' : 'User'),
      createdAt: new Date(Date.now() - (Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString()
    }));
    console.log(`${mockDatabase.length} users created successfully`);
  }

  // Return a copy to avoid direct modifications
  return [...mockDatabase];
};

module.exports = {
  getInitialUsers,
};
