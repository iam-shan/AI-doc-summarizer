module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('files', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.BLOB('long'), // Store file contents as binary data
      allowNull: false,
    },
    uploaded_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'files',
  });

  return File;
};
