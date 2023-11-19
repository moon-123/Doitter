import * as userRepository from './auth.js';
import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';
// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨
// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.

// 단 트윗은 최근글이 맨 위로
// 게시글에 대한 스키마 생성. timestamps를 찍어서 생성 순서대로 보여지게 -> createdAt: -1
// timestamps를 안 찍으면 createdAt이 없나?
const tweetSchema = new Mongoose.Schema({
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true},
    url: String
}, { timestamps: true });

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema); // 게시글 컬렉션 생성

// 게시글 모든걸 다 찾아온다. sort넣어줘서 게시글 순서대로!
export async function getAll(){
    return Tweet.find().sort({createdAt: -1});
}

// 내 게시물 클릭하면 이걸로..?
export async function getAllByUsername(username){
    return Tweet.find({username}).sort({createdAt: -1});
}

// 이것도 내 게시물??
export async function getById(id){
    return Tweet.findById(id);
}

// 게시물 작성, 옆집 auth.js에서 findById로 유저 정보 가져옴.
// 가져온 유저정보를 게시물에 같이 넣어줘야하기 때문임.
// save 사용해서 저장.
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

// 게시글 수정임. 메서드 사용해서 저장. returnDocument는...
// findByIdAndUpdate에서 Id로 게시글 찾고 업데이트를 한 후에 업데이트 하기 전을 보여줄지 후를 보여줄지 정하는 옵션
export async function update(id, text){
    return Tweet.findByIdAndUpdate(id, {text}, {
        returnDocument: "after"
    })
}

// 제거에 해당하는 메서드가 있음.
export async function remove(id){
    return Tweet.findByIdAndDelete(id);
}