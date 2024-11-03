const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'InventoryLocation',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            code: {
                type: DataTypes.STRING(20)
            },
            blocked: {
                type: DataTypes.BOOLEAN
            }
        },
        {

        }
    );
}