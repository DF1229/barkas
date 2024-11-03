const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'InventoryEntry',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            // ref: item.id
            // ref: uom.id
            quantity: {
                type: DataTypes.INTEGER
            },
            // ref: InventoryLocations.id
            expirationDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING(3) // AVL & HLD
            }
        },
        {

        }
    );
}