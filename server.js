const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// PIN Verification Endpoint
app.post('/verify-pin', (req, res) => {
    const SECRET_PIN = process.env.SECRET_PIN || '2305'; // Default PIN: 2305
    const { pin } = req.body;

    if (pin === SECRET_PIN) {
        res.json({ 
            verified: true, 
            redirectUrl: 'https://google.com' // Change to your desired URL
        });
    } else {
        res.json({ verified: false });
    }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
