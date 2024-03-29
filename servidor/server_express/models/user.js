"use strict";

const {DataTypes, Model} = require('sequelize');
const sequelize = require('./sequelize');
const crypt = require('../helpers/crypt');

// Definition of the User model:


class User extends Model {

    verifyPassword(password) {
        return crypt.encryptPassword(password, this.salt) === this.password;
    }

}

User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty: {msg: "Username must not be empty."}}
        },
        pushtoken: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "Password must not be empty."}},
            set(password) {
                // Random String used as salt.
                this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
                this.setDataValue('password', crypt.encryptPassword(password, this.salt));
            }
        },
        salt: {
            type: DataTypes.STRING
        },
    }, {
        sequelize
    }
);

module.exports = User;