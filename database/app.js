import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

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