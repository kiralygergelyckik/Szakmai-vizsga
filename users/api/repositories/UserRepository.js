const { fn, col } = require("sequelize");

class UserRepository
{
    constructor(model)
    {
        this.model = model;
    }

    async getUsers({ where = {} } = {})
    {
        try
        {
            return await this.model.findAll(
            {
                attributes:
                [
                    "ID",
                    "first_name",
                    "last_name",
                    "username",
                    "email",
                    "role",
                    "registeredAt",
                    [
                        fn("COALESCE", fn("SUM", col("pointTransactions.amount")), 0),
                        "pointsBalance",
                    ],
                ],

                where,

                include:
                [
                    {
                        association: "pointTransactions",
                        attributes: [],
                    },
                ],

                group: [ "User.ID" ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getUserById({ id })
    {
        try
        {
            return await this.model.findOne(
            {
                attributes:
                {
                    exclude: [ "password" ],
                },

                where: { ID: id },

                include: [ "pointTransactions", "redemptions" ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getUserByUsername({ username })
    {
        try
        {
            return await this.model.findOne(
            {
                where: { username },
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async createUser({ userInfo })
    {
        try
        {
            return await this.model.create(userInfo);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async updateUser({ id, userInfo })
    {
        try
        {
            const [ affectedCount ] = await this.model.update(userInfo,
            {
                where: { ID: id },
            });

            if(affectedCount === 0) return { affectedCount, updated: null };

            const updated = await this.getUserById({ id });

            return { affectedCount, updated };
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async deleteUser({ id })
    {
        const where = { ID: id };

        try
        {
            const deleted = await this.getUsers({ where });

            const affectedCount = await this.model.destroy(
            {
                where,
            });

            return {
                message: `${affectedCount} User(s) deleted successfully`,
                affectedCount,
                deleted,
            };
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

module.exports = UserRepository;