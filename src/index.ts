// require('dotenv').config({path:'../.env'})

import express from 'express';
import dotenv from 'dotenv';
dotenv.config({
    path: '../.env'
});

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node.js App!');
});
// Middleware

app.use(express.json());

// Routes
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const all_routes = require('express-list-endpoints');
console.log(all_routes(app));
