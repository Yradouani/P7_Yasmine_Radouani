const { Sequelize, DataTypes } = require ('sequelize'); 
const MessageModel = require ('./models/message.js')
const UserModel = require ('./models/user.js')

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
          console.log('Database api synchronised')})
        .catch(error => console.error(`Cannot synchronised database ${error}`))
      }


          module.exports = {
            initDb, Message, User
          }
