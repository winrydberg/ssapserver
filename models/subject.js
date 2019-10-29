'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    tblName: DataTypes.STRING
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
  };
  return Subject;
};