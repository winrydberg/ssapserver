'use strict';
module.exports = (sequelize, DataTypes) => {
  var Exam = sequelize.define('Exam', {
    name: DataTypes.STRING,
    subjectid: DataTypes.INTEGER,
    lecturerid: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    filename: DataTypes.STRING
  }, {});
  Exam.associate = function(models) {
    // associations can be defined here
  };
  return Exam;
};