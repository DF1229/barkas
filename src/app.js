const express = require('express');


const app = express();
app.use(logger);
app.use(express.static('public'));
app.use((req, res) => {
    res.redirect('https://i.giphy.com/lTGLOH7ml3poQ6JoFg.webp');
});

// Simple logging middleware, logs all requests made to the server
// Example output: "04:20:00 ::ffff:127.0.0.1 GET /favicon.ico"
function logger(req, res, next) {
    console.log(`${new Date().toLocaleTimeString()} ${req.ip} ${req.method} ${req.originalUrl}`);
    next();
}

module.exports = app;