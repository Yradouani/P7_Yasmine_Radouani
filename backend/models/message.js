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
export default message; 