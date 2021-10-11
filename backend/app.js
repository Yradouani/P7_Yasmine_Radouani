const express = require ('express');
const helmet = require ('helmet');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
// import mysql from 'promise-mysql';
const sequelize = require ('./sequelize.js');
const path = require ('path');
// const {dirname} = require ('path');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const { fileURLToPath }= require ('url');

const app = express();

app
  .use(helmet())
  .use('/images', express.static(path.join(__dirname, 'images')))
  .use(morgan('dev'))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

dotenv.config()
sequelize.initDb()

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


module.exports = app;
