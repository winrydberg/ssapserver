'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubscription = sequelize.define('StudentSubscription', {
    studentId: DataTypes.INTEGER,
    subscriptionId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER
  }, {});
  StudentSubscription.associate = function(models) {
    // associations can be defined here
  };
  return StudentSubscription;
};