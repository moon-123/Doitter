import * as userRepository from '../data/auth.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

// // 설정파일로 적용할 예정
// const jwtSecretKey = 'abcdef!@#$%^&*()';
// const jwtExpiresInDays = '2d';
// const bcryptSaltRounds = 12;


export async function getUsers(req, res){
    const data = await userRepository.getUsers()
    res.status(200).json(data);
};


export async function signup(req, res){
    const {username, password, name, email, url} = req.body;
    const isUser = await userRepository.findByUsername(username);   // username 중복 확인.
    if(isUser){
        res.status(409).json({message: `username \'${username}\' is already exist`}); // 중복되었다 -> 409
    }
    // 입력된 비밀번호 hash처리
    const hashed = bcrypt.hashSync(password, config.bcrypt.saltRounds);     
    
    // hash된 비밀번호와 나머지 정보로 create User, Token
    const userId = await userRepository.createUser({username, password: hashed, name, email, url}); 
    const token = createJwtToken(userId);
    res.status(201).json( {token, username});
};


function createJwtToken(id){
    return jwt.sign({ id }, config.jwt.secretKey, { expiresIn: config.jwt.expiresInSec });
};


export async function me(req, res, next){
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({message: "사용자를 찾을 수 없음."});
    }
    else{
        return res.status(200).json({token: req.token, username:user.username});
    }
};


export async function login(req, res){
    const {username, password} = req.body;

    const user = await userRepository.findByUsername(username);
    console.log(user);
    if(!user){
        return res.status(401).json({message: 'no Id'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    // await 대신에 compareSync 써도 됨
    if(!isValidPassword){
        return res.status(401).json({message: '비밀번호 틀림'});
    }
    const token = createJwtToken(user.id);
    res.status(200).json({token, username});
};
