'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image_01: DataTypes.TEXT,
    image_02: DataTypes.TEXT,
    image_03: DataTypes.TEXT,
    image_04: DataTypes.TEXT,
    puppyId: DataTypes.INTEGER,
  }, {});
  Image.associate = function (models) {

    Image.belongsTo(models.Puppy, { foreignKey: 'puppyId' });
  };
  return Image;
};
