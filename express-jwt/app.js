// Main Express app entry point

import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './middleware/auth.js'; // JWT authentication middleware

const app = express();


app.use(express.json()); // parse body json

app.use(cookieParser()); //parse cookies in middleware 

app.use('/auth', authRoutes); // to get Token

app.use('/users', usersRoutes);

// 404 with JWT protection
app.use(authenticateToken, (req, res) => {
  res.status(404).json({ message: 'Not Found (auth required)' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
