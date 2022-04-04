'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    litterId: DataTypes.INTEGER,
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: 'userId' });
    Review.belongsTo(models.Litter, { foreignKey: 'litterId' });
    // Review.belongsTo(models.User, { foreignKey: 'userId', onDelete: "cascade", foreignKeyConstraint: true });
    // Review.belongsTo(models.Litter, { foreignKey: 'litterId', onDelete: "cascade", foreignKeyConstraint: true });

  };
  return Review;
};
