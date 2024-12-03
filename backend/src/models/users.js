// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastname:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of integers for restaurant IDs
      allowNull: true,
    },
  }, 
  {
    tableName: 'users',
  });

  return User;
};
