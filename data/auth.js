// let users = [
//     {
//         id: '1',
//         username: 'apple',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '김사과',
//         email: 'apple@apple.com',
//         url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
//     },
//     {
//         id: '2',
//         username: 'banana',
//         password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
//         name: '반하나',
//         email: 'banana@banana.com',
//         url: 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
//     }
// ]
import MongoDb from 'mongodb';
// import { db } from '../db/database.js';
import { getUsers } from '../db/database.js';

// mongo 에서 객체마다의 아이디값에 해당하는 부분.
const ObjectId = MongoDb.ObjectId;


export async function findByUsername(username){
    return getUsers()
        .find({ username })
        .next()
        .then(mapOptionalUser);
    // return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
}

export async function findById(id){
    return getUsers()
        .find({ _id: new ObjectId(id) })
        .next()
        .then(mapOptionalUser);
    // return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])
}

export async function createUser(user){
    return getUsers()
        .insertOne(user)
        .then((result) => console.log(result.insertedId.toString()));
    // result.ops[0]._id.toString()
    // const { username, password, name, email, url } = user;


    // user.push(created); // push 함수 사용.

    // return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
}

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}