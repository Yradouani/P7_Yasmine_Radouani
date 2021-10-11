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
      
      const Message = MessageModel(sequelize, DataTypes)
      const User = UserModel(sequelize, DataTypes)
      
      const initDb = () => {
        sequelize.sync({force: true})
        .then(_ => {
          console.log('Database api synchronised')
      
          // Modifier un message
          // messages.map(message => {
            Message.create({
              // content: req.body.content,
              // picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            //   content: req.body.content,
            //   firstname: req.body.firstname,
            //   lastname: req.body.lastname
            content: 'Bonjour à tous',
            firstname: 'Julie',
            lastname: 'Fournier'
            }).then(Jacques => console.log('La base de donnée a bien été initialisée'))
          })
        // })
      
        .catch(error => console.error(`Cannot synchronised database ${error}`))
      }


    
export default initDb;