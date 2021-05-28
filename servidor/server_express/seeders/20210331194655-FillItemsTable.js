'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Items', [
      {
        productId: 6,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 6,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 5,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 4,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },      {
        productId: 3,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 3,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        productId: 2,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 2,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        shopId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        shopId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        shopId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productId: 1,
        shopId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Items', null, {});
  }
};
