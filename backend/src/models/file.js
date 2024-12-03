module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: DataTypes.STRING,
        path: DataTypes.STRING,
        session_id:{
            type:DataTypes.STRING,
            allowNull: false,
        }
    });

    return File;
};
