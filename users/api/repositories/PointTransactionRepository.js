const { fn, col } = require("sequelize");

class PointTransactionRepository
{
    constructor(model)
    {
        this.model = model;
    }

    async getTransactions({ where = {} } = {})
    {
        try
        {
            return await this.model.findAll(
            {
                where,
                include: [ "user" ],
                order: [ [ "timestamp", "DESC" ] ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getBalanceByUserId({ userId })
    {
        try
        {
            const result = await this.model.findOne(
            {
                attributes:
                [
                    [ fn("COALESCE", fn("SUM", col("amount")), 0), "balance" ],
                ],
                where: { userId },
                raw: true,
            });

            return Number(result?.balance ?? 0);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async createTransaction({ transactionInfo })
    {
        try
        {
            return await this.model.create(transactionInfo);
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

module.exports = PointTransactionRepository;