// import mysql from 'mysql2';
// import {config} from '../config.js';
// import SQ from 'sequelize';

// const { host, user, database, password } = config.db;
// // 시퀄라이즈 사용
// export const sequelize = new SQ.Sequelize(database, user, password, {
//     // option
//     host,
//     dialect: 'mysql',
//     logging: false
// })



// const pool = mysql.createPool({
//     host: config.db.host,
//     user: config.db.user,
//     database: config.db.database,
//     password: config.db.password
// });

// export const db = pool.promise(); // promise형태로 변형해서 import then..등등 사용 가능

import MongoDb from 'mongo';
import { config } from '../config.js';

let db;
export async function connectDB(){
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => client.db())
}