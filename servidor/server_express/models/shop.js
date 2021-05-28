"use strict";

const {DataTypes, Model} = require('sequelize');
const sequelize = require('./sequelize');

// Definition of the Shop model:


class Shop extends Model {
}

Shop.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty: {msg: "ShopName must not be empty."}}
        },
        latitud: {
            type: DataTypes.INTEGER,
            unique: true,
            validate: {notEmpty: {msg: "Latitud must not be empty."}}
        },
        longitud: {
            type: DataTypes.INTEGER,
            validate: {notEmpty: {msg: "Longitud must not be empty."}}
        },
    }, {
        sequelize
    }
);

module.exports = Shop;