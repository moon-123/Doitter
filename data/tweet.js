import * as userRepository from './auth.js';
import SQ, { or } from 'sequelize';
import { sequelize } from '../db/database.js';
import { User } from './auth.js';
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
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define(
    'tweet',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);
// userId가 알아서 만들어짐
// 이름이 결정되어있음 아래처럼.
Tweet.belongsTo(User);

// 단 트윗은 최근글이 맨 위로

// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userId = us.userId';

// const ORDER_DESC = 'order by tw.createdAt desc';
const INCLUDE_USER = {
    attributes: [
        // 객체로 가져오면 하위 레벨로 들어옴. Sequelize.col()을 사용해서 field로 가져와서 select할 수 있게함.
        'id', 'text', 'createdAt', 'userId', 
                                    [Sequelize.col('user.name'), 'name'],
                                    [Sequelize.col('user.username'), 'username'],
                                    [Sequelize.col('user.url'), 'url']
    ],
    include: {
        // model은 테이블
        model: User,
        attributes: [],
    }
}

const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}

export async function getAll() {
    return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC });


    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);

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
    return Tweet.findAll({
        //  include는 조건을 의미, 
        ...INCLUDE_USER, ...ORDER_DESC, include: {
            ...INCLUDE_USER.include, where: { username }
            // include: { model, attributes }
            // attributes에 where username
        }
    })

    // return db.execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username]).then((result) => result[0]);

    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
};

export async function getById(id){
    return Tweet.findOne({ where: { id }, ...INCLUDE_USER });

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
    return Tweet.create({ text, userId })
        .then((data) => this.getById(data.dataValues.id));

    // return db.execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)', [ text, new Date(), userId]).then((result) => getById(result[0].insertId));

    // tweets = [tweet, ...tweets];
    // return getById(tweet.id);
}

export async function update(id, text){  
    return Tweet.findByPk(id, INCLUDE_USER).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });

    // return db.execute('UPDATE tweets SET text=? WHERE id=?', [text, id]).then(() => getById(id));

    // let tweet = tweets.find((tweet) => tweet.id === id);
    // if(tweet){
    //     tweet.text = text;
    // }
    // return getById(tweet.id);
}

export async function remove(id){
    return Tweet.findByPk(id).then((tweet) => {
        tweet.destroy();
    })

    // return db.execute('DELETE FROM tweets WHERE id=?', [id]);
    
    // tweets = tweets.filter((tweet) => tweet.id !== id);
}
