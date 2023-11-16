import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
// import dotenv from 'dotenv';
import { config } from './config.js';
import cors from 'cors';
import { initSocket } from './connection/socket.js'
// import { db } from './db/database.js';
import { connectDB } from './db/database.js';

// dotenv.config();

console.log(process.env.JWT_SECRET);
const app = express();

app.use(express.json());
app.use(morgan("dev")); 
app.use(cors());

// 라우터
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// 오류
app.use((req, res, next) => {
    res.sendStatus(404);
});

// db.getConnection().then(connection => console.log(connection));

connectDB().then((db) => {
    const server = app.listen(config.host.port);
    initSocket(server);
}).catch(console.error);

// const server = app.listen(config.host.port); 
// initSocket(server);