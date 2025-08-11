import express from 'express';
import authenticateToken from '../middleware/auth.js';


const router = express.Router();

// In-memory user store for demonstration
let users = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: 'password' }
];

// Public login route set cookies
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Do not return password in response
    const { password: pw, ...safeUser } = user;
    res.json({ message: 'Login successful', user: safeUser });
});




// Public registration route
router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }
    // Check if user already exists
    if (users.some(u => u.username === username || u.email === email)) {
        return res.status(409).json({ message: 'User already exists' });
    }
    const newUser = { id: `${username}:${email}` + 1, username, email, password };
    users.push(newUser);
    // Do not return password in response
    const { password: pw, ...safeUser } = newUser;
    res.status(201).json(safeUser);
});


// GET all users
router.get('/', authenticateToken, (req, res) => {
    res.json(users);
});


// POST create new user
router.post('/', authenticateToken, (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }
    const newUser = { id: users.length + 1, username, email };
    users.push(newUser);
    res.status(201).json(newUser);
});


// PUT update user by id
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (username) user.username = username;
    if (email) user.email = email;
    res.json(user);
});


// DELETE user by id
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
});


export default router;
