'use strict';
module.exports = (sequelize, DataTypes) => {
  const Puppy = sequelize.define('Puppy', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    birthday: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    litterId: DataTypes.INTEGER,
  }, {});
  Puppy.associate = function (models) {
    Puppy.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true });
    Puppy.belongsTo(models.Litter, { foreignKey: 'litterId', onDelete: "cascade", foreignKeyConstraint: true });

    Puppy.hasMany(models.Image, { foreignKey: 'puppyId' });

  };
  return Puppy;
};
