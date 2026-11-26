const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Task extends Model {};

    Task.init
    (
        {
            ID:
            {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,

                validate:
                {
                    isUUID: 4,
                }
            },

            name:
            {
                type: DataTypes.STRING(120),
                allowNull: false,

                validate:
                {
                    notEmpty: true,
                }
            },

            description:
            {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },

        {
            sequelize,
            modelName: "Task",
            tableName: "tasks",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Task;
};