import express from 'express';
import { authenticateToken, validateToken } from '../middleware/auth.js';


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
    // generate jwt token and send in cookies
    const { password: pw, ...safeUser } = user;
    // 1st arguments could be json as well
    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //seeting cookies on token
    //You can set multiple cookies in a single response by calling res.cookie
    res.cookie('token', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.status(200).send(true);
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
    // generate jwt token and send in cookies
    const accessToken = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //seeting cookies on token
    //You can set multiple cookies in a single response by calling res.cookie
    res.cookie('token', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.status(201).send(true);
});


// GET all users
router.get('/', validateToken, (req, res) => {
    res.json(users);
});


// POST create new user
router.post('/', validateToken, (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }
    const newUser = { id: users.length + 1, username, email };
    users.push(newUser);
    res.status(201).json(newUser);
});


// PUT update user by id
router.put('/:id', validateToken, (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (username) user.username = username;
    if (email) user.email = email;
    res.json(user);
});


// DELETE user by id
router.delete('/:id', validateToken, (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: 'User not found' });
    const deleted = users.splice(index, 1);
    res.json(deleted[0]);
});


export default router;
