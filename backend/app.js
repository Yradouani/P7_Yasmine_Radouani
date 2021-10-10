import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mysql from 'promise-mysql';
import { Sequelize } from 'sequelize'; 
import DataTypes from 'sequelize';
import MessageModel from './models/message.js'
import UserModel from './models/user.js'

const app = express();

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
}
)

sequelize.authenticate()
  .then(_ => console.log('Connected to database'))
  .catch(error => console.error(`Cannot connected to database ${error}`))

const Message = MessageModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

sequelize.sync({force: true})
  .then(_ => {
    console.log('Database api synchronised')

    // Modifier un message
    messages.map(message => {
      Message.create({
        // content: req.body.content,
        // picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        content: req.body.content,
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }).then(Jacques => console.log('La base de donnée a bien été initialisée'))
    })
  })

  .catch(error => console.error(`Cannot synchronised database ${error}`))

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
