const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world! Lorem ipsum dolor');
});

app.listen(port, () => {
    console.log(`Listening on port:${port}`);  
});