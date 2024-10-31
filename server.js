const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// Route to serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Function to manipulate strings
function manipulateString(str, operation) {
    switch (operation) {
        case 'reverse':
            return str.split('').reverse().join('');
        case 'uppercase':
            return str.toUpperCase();
        case 'lowercase':
            return str.toLowerCase();
        case 'palindrome':
            const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            return cleanedStr === cleanedStr.split('').reverse().join('');
        default:
            return 'Invalid operation';
    }
}

// API endpoint to handle string manipulation
app.post('/manipulate', (req, res) => {
    const { inputString, operation } = req.body;
    const result = manipulateString(inputString, operation);
    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
