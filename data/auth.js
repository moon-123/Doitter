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

import { db } from '../db/database.js';
export async function getUsers(){
    return null
}

export async function findByUsername(username){
    return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
}

export async function findById(id){
    return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])

}

export async function createUser(user){
    const { username, password, name, email, url } = user;
    // user.push(created); // push 함수 사용.
    return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
}

