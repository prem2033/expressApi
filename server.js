const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Dummy login route for JWT
app.post('/api/auth/login', (req, res) => {
  const { username } = req.body;

  // Normally you'd validate against DB
  const token = require('jsonwebtoken').sign(
    { username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
