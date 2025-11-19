/**
 * Alternative version of server.js
 * Works without MongoDB (in-memory database)
 * Use this if MongoDB is not available
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.memory');

// Configuration
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// REST API Routes
app.use('/api/users', userRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('API is running... (Mode: In-memory database)');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\nServer started on port ${PORT}`);
  console.log(`Mode: IN-MEMORY database (without MongoDB)`);
  console.log(`API available at: http://localhost:${PORT}`);
  console.log(`User list: http://localhost:${PORT}/api/users\n`);
});
