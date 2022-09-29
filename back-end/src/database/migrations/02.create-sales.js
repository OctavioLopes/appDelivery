module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      total_price: {
        type: Sequelize.DECIMAL(9,2),
      },
      delivery_address: {
        type: Sequelize.STRING,
      },
      delivery_number: {
        type: Sequelize.STRING,
      },
      sale_date: {
        type: Sequelize.DATE,
        default: new Date(),
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface, __Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
