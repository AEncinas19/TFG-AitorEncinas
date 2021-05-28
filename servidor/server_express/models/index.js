const sequelize = require('./sequelize');
const Product = require('./product');
const Shop = require('./shop');
const User = require('./user')


// Relation N-to-N between Shop and Product:
//    A Shop has many products.
//    A Product is placed at many Shops.
Product.belongsToMany(Shop, {
    as: 'shopitems',
    through: 'Items',
    foreignKey: 'productId',
    otherKey: 'shopId'
});

Shop.belongsToMany(Product, {
    as: 'placements',
    through: 'Items',
    foreignKey: 'shopId',
    otherKey: 'productId'
});


module.exports = sequelize;
