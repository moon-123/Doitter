import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';

// mongoose는 스키마를 만들 수 있음
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema) // s 자동으로 붙음
// 컬렉션 완성

export async function findByUsername(username){
    return User.findOne({ username });
}

export async function findById(id){
    return User.findById(id);
}

export async function createUser(user){
    return new User(user).save().then((data) => data.id);
}
// virtual의 id임.
 
