const user = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: {
                msg: 'Adresse mail déjà utilisée !'
            }
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING, 
            allowNull: true
        }
    })
}
module.exports = user; 