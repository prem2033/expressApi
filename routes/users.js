const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth');

// Dummy users data
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// GET all users GET:api/users
userRouter.get('/', (req, res) => {
  console.log('user Get Request')
  res.json(users);
});

//Another way to add aunthication is a below
// router.get('/', userLogin, (req, res) => {
//   res.json(users);
// });

// CREATE user  POST:api/user
userRouter.post('/', (req, res) => {
  console.log('user Post Request')
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// UPDATE user   PUT:api/user/{id}
userRouter.put('/:id', (req, res) => {
  console.log('user Put Request')
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  res.json(user);
});

// DELETE user  DELETE: api/user/{id}
userRouter.delete('/:id', (req, res) => {
  console.log('user Delete Request')
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: 'User deleted' });
});


module.exports = userRouter;
