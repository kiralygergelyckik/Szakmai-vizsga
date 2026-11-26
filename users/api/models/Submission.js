const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Submission extends Model {};

    Submission.init
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

            isDone:
            {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },

        {
            sequelize,
            modelName: "Submission",
            tableName: "submissions",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Submission;
};