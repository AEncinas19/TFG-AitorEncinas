'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        productname: 'Pack refresco + palomitas',
        price: 3.5,
        isoffer: true,
        url: 'https://www.clipartkey.com/mpngs/m/17-173352_transparent-popcorn-and-drink-clipart.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productname: 'Bocadillo caliente',
        price: 2,
        isoffer: false,
        url: 'https://llevatelopalencia.com/wp-content/uploads/2020/12/bocadillo-chorizo-plancha.jpg/',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productname: 'Refresco',
        price: 1,
        isoffer: false,
        url: 'https://image.freepik.com/foto-gratis/refrescos-refrescos-negros-refrescos-o-cola-hielo-vaso-alto-transparente-fondo-naturaleza_29059-296.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productname: 'Cubo Los Vengadores + 2 perritos calientes + bebida para dos',
        price: 7,
        isoffer: true,
        url: 'https://i.ebayimg.com/images/g/YgcAAOSwFzZcsqPA/s-l300.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productname: 'Perrito caliente',
        price: 2,
        isoffer: false,
        url: 'https://thumbs.dreamstime.com/b/perrito-caliente-con-la-salsa-de-tomate-y-mostaza-en-blanco-112613744.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productname: 'Cubo de palomitas',
        price: 3,
        isoffer: false,
        url: 'https://img.freepik.com/vector-gratis/cubo-palomitas-maiz-realista_1284-11409.jpg?size=338&ext=jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Products', null, {});
  }
};