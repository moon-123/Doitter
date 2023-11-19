// 설정파일 
import dotenv from 'dotenv';

// dotenv에 정보가 들어있음.
// .env 파일에 있는 정보를 환경변수로 사용하겠다는 의미

// "이렇게 .env 파일에 저장해놓은 환경 변수들을 dotenv 라이브러리를 이용해서 process.env에 설정할 수 있는데요."
// 출처: https://www.daleseo.com/js-dotenv/
dotenv.config();

// key, value 형태의 매개변수를 받는다 
// -> 받은 key값이 없으면 에러 발생시킨다.
// -> 받은 value값이 없으면 default값을 넘겨받는다.
function required(key, defaultValue=undefined) {
    const value = process.env[key] || defaultValue; // process.env에서 key값을 확인, value값이 입력되어 있으면 그 값을 반환
    // ||는 둘 중 하나의 값을 선택하겠다는 뜻, value = undefined이면 앞에꺼 저장
    if (value == null){
        throw new Error(`key ${key} is undefined`);
    }
    return value;
}

// config Object를 내보냄. 객체의 내용은 아래와 같음.
export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    db: {
        host: required('DB_HOST'),
        // user: required('DB_USER'),
        // database: required('DB_DATABASE')
        // password: required('')
    }
}