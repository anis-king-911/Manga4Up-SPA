/*
const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
*/
const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server running...'));
