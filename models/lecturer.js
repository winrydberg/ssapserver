'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lecturer = sequelize.define('Lecturer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    institution: DataTypes.INTEGER,
    phoneNo: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    billed: DataTypes.BOOLEAN,
    title: DataTypes.STRING,
    activationcode: DataTypes.STRING
  }, {});
  Lecturer.associate = function(models) {
    // associations can be defined here
  };
  return Lecturer;
};