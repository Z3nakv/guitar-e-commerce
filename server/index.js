import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import mongoose from 'mongoose';
import guitarRouter from './routes/guitarCartRoute.js';
import guitarMainRouter from './routes/guitarMainPageRoute.js';
import { FRONTEND_URL, PORT } from './config.js'

import path from 'path';
import { fileURLToPath } from 'url';

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";

const allowedOrigin = process.env.NODE_ENV === 'production' 
    ? 'https://guitar-e-commerce.onrender.com' 
    : `http://localhost:${PORT}`;

const app = express();
app.use(express.json());
app.use(cors());

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.use(express.static(path.join(_dirname, "dist")));

app.use('/api/store', guitarRouter);
app.use('/api/store/main', guitarMainRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join( _dirname, "dist/index.html"))
});

app.get('/', (req, res) => {
    res.json({ response: 'GET'})
});

mongoose.connect(uri)
    .then(() => {
        console.log('databse connected');
        console.log(FRONTEND_URL);
        console.log('puerto:', PORT);
        app.listen(PORT, () => {
            console.log(`server succed on ${FRONTEND_URL}`);
        });
    })
    .catch(err => console.log(err));

