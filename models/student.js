'use strict';
module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    institution: DataTypes.INTEGER,
    phoneNo: DataTypes.STRING,
    image: DataTypes.STRING,
    billed: DataTypes.BOOLEAN,
    verified: DataTypes.BOOLEAN
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
  };
  return Student;
};