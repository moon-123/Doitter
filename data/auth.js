import Mongoose from "mongoose";
import { useVirtualId } from '../db/database.js';

// mongoose는 스키마를 만들 수 있음, ODM의 기능임. 마치 MySQL의 테이블처럼
const userSchema = new Mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    url: String
});

// userSchema에 가상 아이디를 포함시킬 것이다.
useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema) // userSchema에 해당하는 컬렉션을 생성한다.
// 'User' => 'Users'
// 이 객체를 통해서 데이터에 접근할 수 있음.

// user 정보는 username으로 식별이 가능하니까 findOne으로 하나의 유저를 찾아서 반환함.
export async function findByUsername(username){
    return User.findOne({ username });
}

// Id로 찾아낸다. 제공되는 메서드가 있음, 여기서 Id는 사용자 _id임.
export async function findById(id){
    return User.findById(id);
}

// user의 형식은 스키마에 설정한 것과 같음. 생성한 후 id를 반환시킴.
export async function createUser(user){
    return new User(user).save().then((data) => data.id);
}
// virtual의 id임.
 
