module.exports = (sequelize, DataTypes) => {
    const chats = sequelize.define('chats', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
        session_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userMessage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        aiResponse: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return chats;
};
