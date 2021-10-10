module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        picture: {
            type: DataTypes.STRING, 
            allowNull: true
        },
        content: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
}