const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'EnvironmentAccess',
        {
            entry: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            }
        },
        {

        }
    );
}