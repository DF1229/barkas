const { DB_HOST, DB_DIALECT, DB_NAME, DB_USER, DB_PASS } = process.env;
const { Sequelize } = require('sequelize');
const models = require('./models');

class DatabaseManager {
    constructor() {
        // Initial instance variables
        this.connected = false;
        this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
            host: DB_HOST,
            dialect: DB_DIALECT
        });

        (async () => {
            try {
                this.registerModels();
                this.setForeignKeys();
                
                await this.sequelize.authenticate();

                this.synchronizeModels();

                this.connected = true;
                console.log(`${new Date().toLocaleString()} | Database connected`);
            } catch(error) {
                console.error('\n', error);
                return undefined;
            }
        })();

        return this.sequelize;
    }

    registerModels() {
        this.User = models.User(this.sequelize);
        this.Environment = models.Environment(this.sequelize);
        this.EnvironmentAccess = models.EnvironmentAccess(this.sequelize);
        this.Ledger = models.Ledger(this.sequelize);
        this.LedgerAccount = models.LedgerAccount(this.sequelize);
        this.LedgerEntry = models.LedgerEntry(this.sequelize);
        this.Item = models.Item(this.sequelize);
        this.UOM = models.UOM(this.sequelize);
        this.InventoryEntry = models.InventoryEntry(this.sequelize);
        this.InventoryLocation = models.InventoryLocation(this.sequelize);
    }

    setForeignKeys() {
        this.User.hasMany(this.EnvironmentAccess, { as: 'UserId'});
        this.Environment.hasMany(this.EnvironmentAccess, { as: 'EnvironmentId' });
        this.Environment.hasMany(this.Ledger);
        this.Ledger.belongsTo(this.Environment);
        this.Ledger.hasMany(this.LedgerAccount);
        this.LedgerAccount.belongsTo(this.Ledger);
        this.LedgerEntry.belongsTo(this.LedgerAccount);
        this.Item.belongsTo(this.LedgerEntry);
        this.LedgerEntry.hasMany(this.Item);
        this.UOM.belongsTo(this.LedgerEntry);
        this.LedgerEntry.hasMany(this.UOM);
        this.UOM.belongsTo(this.Item);
        this.Item.hasMany(this.UOM);
    }

    synchronizeModels() {
        (async () => {
            switch (process.env.DB_SYNCMODE) {
                case 'create':
                    await this.sequelize.sync();
                case 'alter':
                    await this.sequelize.sync({ alter: true });
                case 'force':
                    await this.sequelize.sync({ force: true });
                default:
                    await this.sequelize.sync();
            }
        })();
    }

    get connection() {
        if (!this.connected) return new DatabaseManager();
        return this.sequelize;
    }

    static close() {
        this.sequelize.close();
    }
}

module.exports.DatabaseManager = DatabaseManager;