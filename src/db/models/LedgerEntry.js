const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'LedgerEntry',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            type: {
                type: DataTypes.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            // ref > item.ID
            // ref: item_uom.ID
            // ref: ledger_account.ID
            quantity: {
                type: DataTypes.INTEGER,
                defaultValue: 0.0,
                allowNull: true
            },
            amount: {
                type: DataTypes.DECIMAL(15, 5), // 15 numbers total, 5 numbers behind the decimal
                defaultValue: 0.0,
                allowNull: true
            }
        },
        {

        }
    );
}