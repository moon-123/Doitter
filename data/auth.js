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
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';
const DataTypes = SQ.DataTypes;

// ORM은 테이블이름에 자동으로 s를 붙임, 없으면 만들고 있으면 기존 테이블 사용함.
export const User = sequelize.define(
    'user',
    {
        id: {
            // option, 타입 & 필드
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,   // not null
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        url: DataTypes.TEXT
    },
    {
        timestamps: false
    }
);

// User.find => select 
// User.findOne => 하나만
export async function findByUsername(username){
    return User.findOne({ where: { username }});
    // return db.execute('SELECT * FROM users WHERE username = ?', [username]).then((result) => result[0][0])
}

export async function findById(id){
    return User.findByPk(id);
    // return db.execute('SELECT * FROM users WHERE id = ?', [id]).then((result) => result[0][0])

}

export async function createUser(user){
    return User.create(user).then((data) => data.dataValues.id);
    // const { username, password, name, email, url } = user;
    // // user.push(created); // push 함수 사용.
    // return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [username, password, name, email, url]).then((result) => result[0].insertId)
}

