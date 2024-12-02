module.exports = (sequelize, DataTypes) => {
    const ChatMessage = sequelize.define('ChatMessage', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        fileId: {
            type: DataTypes.UUID,
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

    ChatMessage.associate = (models) => {
        ChatMessage.belongsTo(models.File, { foreignKey: 'fileId', onDelete: 'CASCADE' });
    };

    return ChatMessage;
};
