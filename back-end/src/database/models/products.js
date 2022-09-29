const ProductSchema = (sequelize, DataTypes) => {
  const ProductTable = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING
  }, { timestamps: false, freezeTableName: true, tableName: 'products', underscored: true });

  return ProductTable;
};

module.exports = ProductSchema;