/*
    회원가입
    router.post('/signup', ...) -> create

    로그인
    router.post('/login', ...) -> 데이터가 있는지 없는지 확인하는 용도

    // git hub에 올리기
    
    // JWT 확인
    // router.get('/me', ...)

*/
import express from "express";
import * as tweetController from '../controller/tweet.js'

const router = express.Router()

router.get('/', tweetController.getUsers);

router.post('/signup', tweetController.joinTweet);

router.post('/login', tweetController.loginTweet);

export default router;