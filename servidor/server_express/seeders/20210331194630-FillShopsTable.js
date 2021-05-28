'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shops', [
      {
        name: 'CC Las Rosas',
        latitud: 40.43324587822164,
        longitud: -3.6110609821404744,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'E.D Almudena',
        latitud: 40.41947153515853, 
        longitud: -3.6305067129076014,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Andrea house',
        latitud: 40.42702571066079, 
        longitud: -3.631944341989806,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ETSIT',
        latitud: 40.453118557885745, 
        longitud: -3.7275815033760975,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Quizzes', null, {});
  }
};
