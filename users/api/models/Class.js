const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Class extends Model {};

    Class.init
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
                type: DataTypes.STRING(100),
                allowNull: false,

                validate:
                {
                    notEmpty: true,
                }
            },

            code:
            {
                type: DataTypes.STRING(30),
                unique: true,
                allowNull: false,

                validate:
                {
                    notEmpty: true,
                }
            },
        },

        {
            sequelize,
            modelName: "Class",
            tableName: "classes",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Class;
};