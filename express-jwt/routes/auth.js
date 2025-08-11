// Login route for JWT authentication

import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/login', (req, res) => {
  // In a real app, validate user credentials from DB
  const { username, password } = req.body;
  if (username !== 'admin' || password !== 'password') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const user = { username };

const randomNum = Math.floor(Math.random() * 900) + 100;

const accessToken = jwt.sign(user, `my_jwt_token-${randomNum}`, { expiresIn: '1h' });

  res.json({ accessToken });
});

export default router;
