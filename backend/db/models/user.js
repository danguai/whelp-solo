'use strict';

const { Validator } = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      isNotEmail(value) {
        if (Validator.isEmail(value)) {
          throw new Error('Cannot be an email.');
        }
      }
    },
    email: DataTypes.STRING,
    imageProfile: DataTypes.TEXT,
    hashedPassword: DataTypes.STRING.BINARY,
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });

  User.login = async function ({ username, password }) {
    const user = await User.scope('loginUser').findOne({
      where: { username }
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ firstName, lastName, username, email, imageProfile, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      imageProfile,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.associate = models => {
    // associations can be defined here
  };

  User.prototype.toSafeObject = function () {
    const { id, username, imageProfile, email } = this;
    return { id, username, imageProfile, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  return User;
};
