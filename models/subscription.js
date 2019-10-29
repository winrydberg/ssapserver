'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subscription = sequelize.define('Subscription', {
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {});
  Subscription.associate = function(models) {
    // associations can be defined here
  };
  return Subscription;
};