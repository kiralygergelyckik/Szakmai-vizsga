class RewardRepository
{
    constructor(rewardModel, redemptionModel)
    {
        this.rewardModel = rewardModel;
        this.redemptionModel = redemptionModel;
    }

    async getRewards({ where = {} } = {})
    {
        try
        {
            return await this.rewardModel.findAll(
            {
                where,
                order: [ [ "cost", "ASC" ] ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getRewardById({ id })
    {
        try
        {
            return await this.rewardModel.findOne(
            {
                where: { ID: id },
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async createReward({ rewardInfo })
    {
        try
        {
            return await this.rewardModel.create(rewardInfo);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async createRedemption({ redemptionInfo })
    {
        try
        {
            return await this.redemptionModel.create(redemptionInfo);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getRedemptions({ where = {} } = {})
    {
        try
        {
            return await this.redemptionModel.findAll(
            {
                where,
                include: [ "user", "reward" ],
                order: [ [ "redeemedAt", "DESC" ] ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

module.exports = RewardRepository;