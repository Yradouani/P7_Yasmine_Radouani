import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
// import mysql from 'promise-mysql';
// import sequelize from './sequelize.js'
// import initDb from './sequelize.js'

const app = express();

app
  .use(helmet())
  .use(morgan('dev'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

dotenv.config()


import { Sequelize } from 'sequelize'; 
import DataTypes from 'sequelize';
import MessageModel from './models/message.js'
import UserModel from './models/user.js'

    const sequelize = new Sequelize(
        'api',
        'yasmine',
        process.env.DB,
        {
          host: 'localhost',
          port: 3307,
          dialect: 'mariadb',
          dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
      })
      
      sequelize.authenticate()
        .then(_ => console.log('Connected to database'))
        .catch(error => console.error(`Cannot connected to database ${error}`))
      
      export const Message = MessageModel(sequelize, DataTypes)
      export const User = UserModel(sequelize, DataTypes)
      
      const initDb = () => {
        sequelize.sync({force: true})
        .then(_ => {
          console.log('Database api synchronised')})
        .catch(error => console.error(`Cannot synchronised database ${error}`))
      }
initDb()
// mysql.createConnection({
//   host: 'localhost',
//   database: 'api',
//   user: 'root',
//   password: process.env.DB,
//   port: '3307',
// }).then((db) => {
//   console.log('connected to my sql')
//       db.query('SELECT * FROM users', (err, result) => {
//           if(err) {
//               console.log(err.message)
//           } else {
//               console.log(result)
//           }
//       })
// }).catch((err) => {
//   console.log('Error during database connexion')
//   console.log(err.message)
// })


export default app;
