// require('dotenv').config({path:'../.env'})

import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
dotenv.config({
    path: '../.env'
});

const app = express();
const port = process.env.PORT || 8004;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript Node.js App!');
});
// Middleware

app.use(express.json());

app.use('/api/',router);

// Routes
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
