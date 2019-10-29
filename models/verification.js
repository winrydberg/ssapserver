'use strict';
module.exports = (sequelize, DataTypes) => {
  var Verification = sequelize.define('Verification', {
    userId: DataTypes.INTEGER,
    vcode: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    accountType: DataTypes.INTEGER
  }, {});
  Verification.associate = function(models) {
    // associations can be defined here
  };
  return Verification;
};