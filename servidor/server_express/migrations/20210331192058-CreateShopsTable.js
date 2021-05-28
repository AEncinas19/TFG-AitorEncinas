'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Shops',
    {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        latitud: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        longitud: {
            type: Sequelize.INTEGER,
            allowNull: false
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
    await queryInterface.dropTable('Shops');
  }
};
