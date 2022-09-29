const SalesProductSchema = (sequelize, DataTypes) => {
  const SalesProductTable = sequelize.define("SalesProduct", {
    saleId: { type: DataTypes.INTEGER, primaryKey: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, freezeTableName: true, tableName: 'sales_products', underscored: true });

  SalesProductTable.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: models.SalesProduct,
    })
    
    models.Product.belongsToMany(models.Sale, {
      through: models.SalesProduct,
    })
  }
  
  return SalesProductTable;
};

module.exports = SalesProductSchema;
