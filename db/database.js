import Mongoose from 'mongoose';
import {config} from '../config.js';


export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

// export const db = pool.promise(); // promise형태로 변형해서 import then..등등 사용 가능

export function useVirtualId(schema){
    // 실제 저장소는 아님.
    schema.virtual('id').get(function() {
        return this._id.toString();
    });
    // 몽고DB에서 메모리에 저장되는, 가상의 항목
    schema.set('toJSON', { virtuals: true });
    schema.set('toObject', { virtuals: true });
}

let db;
export function getTweets(){
    return db.collection('tweets');
}

