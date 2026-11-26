const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Question extends Model {};

    Question.init
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
                type: DataTypes.TEXT,
                allowNull: false,

                validate:
                {
                    notEmpty: true,
                }
            },

            points:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,

                validate:
                {
                    min:
                    {
                        args: [0],
                        msg: "A pontérték nem lehet negatív."
                    },
                }
            },
        },

        {
            sequelize,
            modelName: "Question",
            tableName: "questions",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Question;
};