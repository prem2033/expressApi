const express = require('express');
const adminRouter = express.Router();

// Dummy admin data
let adminUser = [
  { id: 1, name: 'Admin' }
];

// GET all users GET:api/users
adminRouter.get('/', (req, res) => {
  res.json(users);
});


module.exports = adminRouter;
