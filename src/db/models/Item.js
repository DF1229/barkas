const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Item',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            variant: {
                type: DataTypes.STRING(20)
            },
            // ref: base_uom
            baseCost: {
                type: DataTypes.DECIMAL(15, 5)
            },
            basePrice: {
                type: DataTypes.DECIMAL(15, 5)
            }
        },
        {

        }
    );
}