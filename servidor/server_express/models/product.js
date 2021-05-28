"use strict";

const {DataTypes, Model} = require('sequelize');
const sequelize = require('./sequelize');

// Definition of the Shop model:


class Product extends Model {
}

Product.init({
        productname: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty: {msg: "ProductName must not be empty."}}
        },
        price: {
            type: DataTypes.INTEGER,
            validate: {notEmpty: {msg: "Price must not be empty."}}
        },
        isoffer: {
            type: DataTypes.BOOLEAN,
            validate: {notEmpty: {msg: "Sale must not be empty"}}
        },
        url: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize
    }
);

module.exports = Product;