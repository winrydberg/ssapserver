'use strict';
module.exports = (sequelize, DataTypes) => {
  var LecturerSubscription = sequelize.define('LecturerSubscription', {
    subjectId: DataTypes.INTEGER,
    lecturerId: DataTypes.INTEGER,
    subscriptionId: DataTypes.INTEGER,
    isApproved: DataTypes.BOOLEAN
  }, {});
  LecturerSubscription.associate = function(models) {
    // associations can be defined here
  };
  return LecturerSubscription;
};