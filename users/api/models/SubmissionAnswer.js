const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class SubmissionAnswer extends Model {};

    SubmissionAnswer.init
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

            selectedAnswerId:
            {
                type: DataTypes.UUID,
                allowNull: true,

                validate:
                {
                    isUUID: 4,
                }
            },
        },

        {
            sequelize,
            modelName: "SubmissionAnswer",
            tableName: "submission_answers",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return SubmissionAnswer;
};