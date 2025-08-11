const express = require('express');
const adminRouter = express.Router();

// Dummy admin data
let adminUser = [
  { id: 1, name: 'Admin' }
];

// GET all users GET:api/users
adminRouter.get('/', (req, res) => {
  console.log('Admin Get Request');
  res.json(adminUser);
});


module.exports = adminRouter;
