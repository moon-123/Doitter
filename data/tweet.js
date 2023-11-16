import * as userRepository from './auth.js';
import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
const ObjectId = MongoDb.ObjectId;

// filter를 사용하면 여러개를 반환 가능
// find를 사용하면 반복문을 직접 돌리지 않아도 됨
// js는 obj에 key와 value가 같으면 하나를 생략할 수 있다.

// 단 트윗은 최근글이 맨 위로

export async function getAll() {
    return getTweets()
        .find()
        .sort({ createdAt: -1 }) // 내림차순
        .toArray()
        .then(mapTweets);
    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
};


export async function getAllByUsername(username){
    return getTweets()
        .find({ username })
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);

    // return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);

    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export async function getById(id){
    return getTweets()
        .find({ _id: new ObjectId(id)})
        .next()
        .then(mapOptionalTweet);

    // return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => result[0][0]);

    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found){
    //     return null;
    // }
    // const { username, name, url } = await userRepository.findById(found.userId);
    // return { ...found, username, name, url };
};

// 글 생성 후 본인이 쓴 글만 바로 보여줌
export async function create(text, userId) {
    return userRepository
        .findById(userId)
        .then((user) =>
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                userId,
                name: user.name,
                username: user.username,
                url: user.url
            })
        )
        .then((result) => getById(result.insertedId))
        .then(mapOptionalTweet);

    // return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [ text, new Date(), userId]).then((result) => getById(result[0].insertId));

    // tweets = [tweet, ...tweets];
    // return getById(tweet.id);
}

export async function update(id, text){  
    return getTweets()
        .findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { text } },
            { returnDocument: "after" } // 변경 전
        )
        .then((result) => result)
        .then(mapOptionalTweet);
    // return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));

    // let tweet = tweets.find((tweet) => tweet.id === id);
    // if(tweet){
    //     tweet.text = text;
    // }
    // return getById(tweet.id);
}

export async function remove(id){
    return getTweets().deleteOne({ _id: new ObjectId(id) });

    // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
    
    // tweets = tweets.filter((tweet) => tweet.id !== id);
}

function mapOptionalTweet(tweet){
    return tweet 
        ? { ...tweet, id: tweet.insertedId }
        : tweet
}

function mapTweets(tweets){
    return tweets.map(mapOptionalTweet);
}