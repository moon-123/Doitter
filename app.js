import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
// import dotenv from 'dotenv';
import { config } from './config.js';

// dotenv.config();

console.log(process.env.JWT_SECRET);
const app = express();

app.use(express.json());
app.use(morgan("dev")); 

// 라우터
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// 오류
app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(config.host.port); 