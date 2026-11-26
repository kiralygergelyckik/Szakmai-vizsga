const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class AnswerOption extends Model {};

    AnswerOption.init
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

            text:
            {
                type: DataTypes.STRING(255),
                allowNull: false,

                validate:
                {
                    notEmpty: true,
                }
            },

            isCorrect:
            {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },

        {
            sequelize,
            modelName: "AnswerOption",
            tableName: "answer_options",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return AnswerOption;
};