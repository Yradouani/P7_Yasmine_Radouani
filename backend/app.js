import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mysql from 'mysql2';



const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

dotenv.config()
const db = mysql.createConnection({
  host: 'localhost',
  database: 'api',
  user: 'root',
  password: process.env.DB,
  port: '3307',
})

db.connect((err) => {
  if (err) {
      console.log(err.message)
  }else {
      console.log('connected to my sql')
      db.query('SELECT * FROM users', (err, result) => {
          if(err) {
              console.log(err.message)
          } else {
              console.log(result)
          }
      })
  }
})


export default app;
