"use strict";
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class Todo extends Model {}

  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      due_date: DataTypes.DATE
    },
    { sequelize }
  );

  // const Todo = sequelize.define('Todo', {
  //   title: DataTypes.STRING,
  //   description: DataTypes.STRING,
  //   status: DataTypes.STRING,
  //   due_date: DataTypes.DATE
  // }, {});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
