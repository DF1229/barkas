const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'UnitOfMeasure',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            // ref: item.id
            code: {
                type: DataTypes.STRING(20)
            },
            isBaseUom: {
                type: DataTypes.BOOLEAN
            },
            quantity: {
                type: DataTypes.INTEGER
            }
        },
        {

        }
    );
}