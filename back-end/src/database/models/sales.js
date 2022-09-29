const SaleSchema = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define("Sale", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER
  }, { timestamps: false, freezeTableName: true, tableName: 'sales', underscored: true });

  SaleTable.associate = (models) => {
    SaleTable.belongsTo(models.User, {
      as: 'user',
      foreingKey: 'userId'
    })
  };

  SaleTable.associate = (models) => {
    SaleTable.belongsTo(models.User, {
      as: 'seller',
      foreingKey: 'sellerId'
    })
  }
  return SaleTable;
};

module.exports = SaleSchema;