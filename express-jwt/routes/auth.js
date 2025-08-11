// Login route for JWT authentication
import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/token', (req, res) => {
    // In a real app, validate user credentials from DB
    const { username, password } = req.body;
    if (username !== 'admin' || password !== 'password') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = { username };

    const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ accessToken });
});

export default router;
