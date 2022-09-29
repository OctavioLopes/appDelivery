module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_products', {
      sale_id: { allowNull: false, primaryKey: true, type: Sequelize.INTEGER,
      },
      product_id: { allowNull: false, primaryKey: true, type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, __Sequelize) => {
    await queryInterface.dropTable('salesProducts');
  },
};
