/**
 * Routes alternatives utilisant le contrôleur en mémoire
 */

const express = require('express');
const { getUsers } = require('../controllers/UserController.memory');
const router = express.Router();

// Endpoint pour récupérer la liste des utilisateurs
router.get('/', getUsers);

module.exports = router;
