import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import mongoose from 'mongoose';
import guitarRouter from './routes/guitarCartRoute.js';
import guitarMainRouter from './routes/guitarMainPageRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

const port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URL;

const app = express();
app.use(express.json());
app.use(cors({
    origin: `http://localhost:${port}` || 'https://guitar-e-commerce.onrender.com',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));

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
        app.listen(port, () => {
            console.log(`server succed on http://localhost:${port}/`);
        });
    })
    .catch(err => console.log(err));

