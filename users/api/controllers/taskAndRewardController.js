function createTaskAndRewardController({ taskService, pointAndRewardService })
{
    async function getTasks(req, res, next)
    {
        try
        {
            res.status(200).json(await taskService.getTasks());
        }
        catch (error)
        {
            next(error);
        }
    }

    async function createTask(req, res, next)
    {
        try
        {
            const { name, description, classId } = req.body || {};
            res.status(201).json(await taskService.createTask(
            {
                taskInfo: { name, description, classId },
            }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function adjustPoints(req, res, next)
    {
        try
        {
            const { userId, amount } = req.body || {};
            res.status(201).json(await pointAndRewardService.adjustPoints({ userId, amount }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function getRewards(req, res, next)
    {
        try
        {
            res.status(200).json(await pointAndRewardService.getRewards());
        }
        catch (error)
        {
            next(error);
        }
    }

    async function createReward(req, res, next)
    {
        try
        {
            const { name, cost } = req.body || {};
            res.status(201).json(await pointAndRewardService.createReward(
            {
                rewardInfo: { name, cost },
            }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function redeemReward(req, res, next)
    {
        try
        {
            const { userId, rewardId } = req.body || {};
            res.status(201).json(await pointAndRewardService.redeemReward({ userId, rewardId }));
        }
        catch (error)
        {
            next(error);
        }
    }

    return {
        getTasks,
        createTask,
        adjustPoints,
        getRewards,
        createReward,
        redeemReward,
    };
}

module.exports = createTaskAndRewardController;