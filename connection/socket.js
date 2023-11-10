import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import { config } from "../config.js";


class Socket {
    constructor(sever){
        this.io = new Server(sever, {
            cors: {
                origin: '*'
            }
            // CORS 에러를 방지하기 위해, 출처를 '*'로 설정
        });

        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token; // 토큰이 보이지 않게 함
            if(!token) {
                return next(new Error('인증 에러!'));
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
                if(error){
                    return next(new Error('인증 에러!'));
                }
                next();
            });
        });

        this.io.on('connection', (sockeet) => {
            console.log('클라이언트 접속!!');
        })
    }
}

// 싱글톤 패턴 -> js에서는 못함 -> 함수 형태로
let socket;
export function initSocket(server){
    if(!socket){
        socket = new Socket()
    }
}

export function getSocketIO(){
    if(!socket){
        throw new Error('먼저 init를 실행해야함!');
    }
    return socket.io;
}