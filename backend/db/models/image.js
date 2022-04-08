'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image: DataTypes.TEXT,
    puppyId: DataTypes.INTEGER,
  }, {});
  Image.associate = function (models) {

    Image.belongsTo(models.Puppy, { foreignKey: 'puppyId' });
  };
  return Image;
};
