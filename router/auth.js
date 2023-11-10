import express from "express";
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('username은 반드시 입력해야함.'),
    body('password')
        .trim()
        .isLength({ min:4 })
        .withMessage('password는 반드시 4자 이상이어야함'),
    validate
]

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name은 반드시 입력'),
    body('email').isEmail().withMessage('email 형식 확인'),
    body('url').isURL().withMessage('URL 형식 확인')
        .optional({ nullable: true, checkFalsy: true}), // false로 판별되는 것들을 null로 처리하라.
    validate
]


// router.get('/', authController.getUsers);
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateCredential, authController.login);
router.get('/me', isAuth, authController.me);

export default router;