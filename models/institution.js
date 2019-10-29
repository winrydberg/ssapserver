'use strict';
module.exports = (sequelize, DataTypes) => {
  var Institution = sequelize.define('Institution', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING
  }, {});
  Institution.associate = function(models) {
    // associations can be defined here
  };
  return Institution;
};