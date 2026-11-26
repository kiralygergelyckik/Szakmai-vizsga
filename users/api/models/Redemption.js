const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class Redemption extends Model {};

    Redemption.init
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

            redeemedAt:
            {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },

        {
            sequelize,
            modelName: "Redemption",
            tableName: "redemptions",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return Redemption;
};