'use strict';
module.exports = (sequelize, DataTypes) => {
  const Litter = sequelize.define('Litter', {
    name: DataTypes.STRING,
    imageHeader: DataTypes.TEXT,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});

  Litter.associate = function (models) {
    Litter.belongsTo(models.User, { foreignKey: 'userId' });
    // Litter.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true });

    Litter.hasMany(models.Review, { foreignKey: 'litterId' });
    Litter.hasMany(models.Puppy, { foreignKey: 'litterId' });

  };
  return Litter;
};
