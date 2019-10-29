'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    roleid: DataTypes.INTEGER
  }, {});
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};