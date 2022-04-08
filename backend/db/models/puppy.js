'use strict';
module.exports = (sequelize, DataTypes) => {
  const Puppy = sequelize.define('Puppy', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    year: DataTypes.STRING,
    month: DataTypes.STRING,
    day: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    litterId: DataTypes.INTEGER,
  }, {});
  Puppy.associate = function (models) {
    // Puppy.belongsTo(models.User, { foreignKey: 'userId' });
    // Puppy.belongsTo(models.Litter, { foreignKey: 'litterId' });
    Puppy.belongsTo(models.User, { foreignKey: 'userId' });
    Puppy.belongsTo(models.Litter, { foreignKey: 'litterId' });

    Puppy.hasMany(models.Image, { foreignKey: 'puppyId' });

  };
  return Puppy;
};
