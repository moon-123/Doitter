import Mongoose from 'mongoose';
import {config} from '../config.js';

// Mongoose를 사용하는 방법임. db.host에 정의한 값을 가지고 연결시킴, ODM 방법임.
// 그 값은 Mongoose에서 가져온 링크형식임, 아이디와 키를 넣을 수 있음.
export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

// export const db = pool.promise(); // promise형태로 변형해서 import then..등등 사용 가능

// 가상 아이디를 사용함. 실제 값은 아니라고 받아들이기.
// 가상의 항목임, 가상의 항목임, 가상의 항목임.
export function useVirtualId(schema){
    // 실제 저장소는 아님.
    schema.virtual('id').get(function() {   // _id를 사용하는 것보다 id를 사용하는 것이 더 편하기도 함, 보안상의 이유도 있음. 
                                            // id가 아닌 다른 이름이어도 됨. 사용하기 편한..
        return this._id.toString();         // 객체의 _id를 문자열, get안에 콜백함수이기 때문에 get(_id 문자열로 변환한 것)임. 주로 이렇게 씀
    });
    // 몽고DB에서 메모리에 저장되는, 가상의 항목
    schema.set('toJSON', { virtuals: true });   // JSON으로 변환한 정보에 가상 id 필드를 보여줄 것인지?
    schema.set('toObject', { virtuals: true }); // Object로 변환한 정보에 가상 id 필드를 보여줄 것인지?
}


// 이거 왜 있는지 모르겠음. 없어도 되나??
let db;
export function getTweets(){
    return db.collection('tweets');
}

// db 컬렉션에 존재하는 tweets를 반환함. 
// 전역 db 변수의 의미에 집중해보자.


