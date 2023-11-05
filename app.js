import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js';
import tweetsAuth from './router/auth.js';
const app = express();

app.use(express.json());
app.use(morgan("dev")); 

// 라우터
app.use('/tweets', tweetsRouter);
app.use('/auth', tweetsAuth);

// 오류
app.use((req, res, next) => {
    res.sendStatus(404);
})

app.listen(8080); 