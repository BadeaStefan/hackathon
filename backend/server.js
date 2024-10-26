import express from 'express';
import mongoose from './db.js';
import userRouter from './routes/userRoute.js';
import partyRouter from './routes/partyRoute.js';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/api/users', userRouter);
app.use('/api/party', partyRouter);

const port = 3000;

app.listen(port, () => console.log(`Server us running at ${port}`));

