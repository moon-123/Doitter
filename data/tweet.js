import * as userRepository from './auth.js';
import { db } from '../db/database.js';
// let tweets = [
//     {
//         id: '1',
//         text: '안녕하세요!',
//         createdAt: Date.now().toString(),
//         userId: '1'
//     },
//     {
//         id: '2',
//         text: '반갑습니다!',
//         createdAt: Date.now().toString(),
//         userId: '2'
//     }
// ];

// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨
// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.

// 단 트윗은 최근글이 맨 위로

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userId = us.userId';

const ORDER_DESC = 'order by tw.createdAt desc';

export async function getAll() {
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);

    // const tweets = db.execute('SELECT * FROM tweets').then((result) => console.log(result[0]))
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const { username, name, url } = db.execute('SELECT * FROM users WHERE userId = ?', [userId])
    //         return { ...tweet, username, name, url}
    //     })
    //     // tweets.map(async (tweet) => {
    //     //     const { username, name, url } = await userRepository.findById(tweet.userId);
    //     //     return { ...tweet, username, name, url};
    //     // })
    // );
};


export async function getAllByUsername(username){
    return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);

    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export async function getById(id){
    return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => result[0][0]);

    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found){
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return { ...found, username, name, url };
};

// 글 생성 후 본인이 쓴 글만 바로 보여줌
export async function create(text, userId) {
    return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [ text, new Date(), userId]).then((result) => getById(result[0].insertId));

    // tweets = [tweet, ...tweets];
    // return getById(tweet.id);
}

export async function update(id, text){  
    return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));

    // let tweet = tweets.find((tweet) => tweet.id === id);
    // if(tweet){
    //     tweet.text = text;
    // }
    // return getById(tweet.id);
}

export async function remove(id){
    return db.execute('DELETE FROM tweets WHERE id=?', [id]);
    
    // tweets = tweets.filter((tweet) => tweet.id !== id);
}
