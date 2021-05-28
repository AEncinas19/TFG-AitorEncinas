'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items',
    {
        productId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: "compositeKey",
          allowNull: false,
              references: {
                model: "Products",
                key: "id"
              }
        },
        shopId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: "compositeKey",
          allowNull: false,
              references: {
                model: "Shops",
                key: "id"
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    },
    {
        sync: {force: true}
    }
);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};
