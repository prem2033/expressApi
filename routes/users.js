const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Dummy users data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET all users
router.get('/', auth, (req, res) => {
  res.json(users);
});

// CREATE user
router.post('/', auth, (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user
router.put('/:id', auth, (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  res.json(user);
});

// DELETE user
router.delete('/:id', auth, (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
