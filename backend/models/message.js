const message = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
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
        imageUrl: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        likes : {
            type: DataTypes.INTEGER, 
            default: 0,
            allowNull: true
        },
        dislikes : {
            type: DataTypes.INTEGER, 
            default: 0,
            allowNull: true
        },
    })
}
module.exports = message; 