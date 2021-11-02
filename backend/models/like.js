const like = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
        _id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER, 
        },
        id: {
            type: DataTypes.INTEGER, 
        },

    })
}
module.exports = like;