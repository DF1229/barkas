const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'LedgerAccount',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false
            }
        },
        {

        }
    );
}