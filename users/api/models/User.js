const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) =>
{
    class User extends Model
    {
        get name()
        {
            return `${this.first_name} ${this.last_name}`;
        }
    };

    User.init
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

            first_name:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },

            last_name:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },

            username:
            {
                type: DataTypes.STRING(60),
                unique: true,
                allowNull: false,

                validate:
                {
                    len:
                    {
                        args: [3, 60],
                        msg: "A felhasználónévnek 3-60 karakternek kell lennie."
                    },

                    notEmpty: true,
                }
            },

            email:
            {
                type: DataTypes.STRING(120),
                unique: true,
                allowNull: false,

                validate:
                {
                    isEmail:
                    {
                        msg: "Érvényes e-mail-címet adj meg."
                    },

                    notEmpty: true,
                }
            },

            password:
            {
                type: DataTypes.STRING,
                allowNull: false,
            },

            role:
            {
                type: DataTypes.ENUM("student", "teacher", "admin"),
                defaultValue: "student",
                allowNull: false,

                validate:
                {
                    isIn:
                    {
                        args: [ [ "student", "teacher", "admin" ] ],
                        msg: "Nem lehet ilyen role-al felvenni ezt a usert."
                    },
                }
            },
        },

        {
            sequelize,
            modelName: "User",
            tableName: "users",
            freezeTableName: true,
            updatedAt: false,
            createdAt: "registeredAt",
        }
    );

    return User;
};