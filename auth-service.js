const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());

const users = []; // In-memory user storage for simplicity

// Register route
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ username, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Start auth service
app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});