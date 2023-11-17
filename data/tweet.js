import * as userRepository from './auth.js';
import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';
// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨
// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.

// 단 트윗은 최근글이 맨 위로

const tweetSchema = new Mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true},
    url: String
}, { timestamps: true });

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getAll(){
    return Tweet.find().sort({createdAt: -1});
}

export async function getAllByUsername(username){
    return Tweet.find({username}).sort({createdAt: -1});
}

export async function getById(id){
    return Tweet.findById(id);
}

export async function create(text, userId){
    return userRepository.findById(userId).then((user) => 
        new Tweet({
            text,
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }).save().then((res) => res)
    )
}

export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, {text}, {
        returnDocument: "after"
    })
}

export async function remove(id){
    return Tweet.findByIdAndDelete(id);
}