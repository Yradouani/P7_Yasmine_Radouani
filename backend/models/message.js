const message = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        imageUrl: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        imageProfil: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true
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