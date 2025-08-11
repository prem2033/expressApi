// Main Express app entry point

import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
// import {cookieParser} from 'cookie-parser';

const app = express();


app.use(express.json());

// app.use(cookieParser());

app.use('/auth', authRoutes);

app.use('/users', usersRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
