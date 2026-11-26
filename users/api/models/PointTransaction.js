const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class PointTransaction extends Model {};

    PointTransaction.init
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

            amount:
            {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            timestamp:
            {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },

        {
            sequelize,
            modelName: "PointTransaction",
            tableName: "point_transactions",
            freezeTableName: true,
            timestamps: false,
        }
    );

    return PointTransaction;
};