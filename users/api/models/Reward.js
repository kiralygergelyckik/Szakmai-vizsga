const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Reward extends Model {};

    Reward.init
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

            cost:
            {
                type: DataTypes.INTEGER,
                allowNull: false,

                validate:
                {
                    min:
                    {
                        args: [100],
                        msg: "A jutalom ára legalább 1000 pont kell legyen."
                    },
                }
            },
        },

        {
            sequelize,
            modelName: "Reward",
            tableName: "rewards",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Reward;
};