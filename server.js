// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const adminIP = '178.117.160.221';

app.use(bodyParser.json());
app.use(express.static('public'));

function restrictToAdmin(req, res, next) {
    if (req.ip === adminIP) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}

let entries = [];
let countdown = 0; // Countdown in minutes

app.post('/enter', (req, res) => {
    const { username } = req.body;
    if (entries.includes(username)) {
        return res.json({ success: false, message: 'Already entered' });
    }
    entries.push(username);
    res.json({ success: true });
});

app.post('/start', (req, res) => {
    if (entries.length === 0) {
        return res.json({ success: false, message: 'No entries available' });
    }
    setTimeout(() => {
        const winner = entries[Math.floor(Math.random() * entries.length)];
        entries = []; // Reset entries for the next giveaway
        res.json({ success: true, winner });
    }, countdown * 60000); // Convert minutes to milliseconds
});

app.post('/settings', restrictToAdmin, (req, res) => {
    const { newCountdown } = req.body;
    countdown = newCountdown;
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

