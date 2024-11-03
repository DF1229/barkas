const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            firstname: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(320),
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(15)
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {

        }
    );
}