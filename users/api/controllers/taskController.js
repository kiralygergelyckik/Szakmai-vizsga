
const db = require("../db");

async function getTasks(req, res, next) {
    try {
        const tasks = await db.Tasks.findAll();

        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
}

async function createTask(req, res, next) {
    try {
        const { name, description, classId } = req.body || {};

        if (!name || !classId) {
            return res.status(400).json({
                message: "A feladat neve és az osztály megadása kötelező."
            });
        }

        const task = await db.Tasks.create({
            name,
            description,
            classId
        });

        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
}

async function adjustPoints(req, res, next) {
    try {
        const userId = req.params.id || req.body?.userId;
        const amount = Number(req.body?.amount);

        if (!userId || !Number.isInteger(amount) || amount === 0) {
            return res.status(400).json({
                message: "Érvényes felhasználóazonosító és nem nulla egész pontérték szükséges."
            });
        }

        const result = await db.sequelize.transaction(async (transaction) => {
            const user = await db.Users.findByPk(userId, {
                transaction,
                lock: transaction.LOCK.UPDATE
            });

            if (!user) {
                throw Object.assign(
                    new Error("Felhasználó nem található."),
                    { status: 404 }
                );
            }

            await db.PointTransactions.create({
                userId,
                amount
            }, { transaction });

            const totalPoints = await db.PointTransactions.sum("amount", {
                where: { userId },
                transaction
            });

            return {
                userId,
                points: totalPoints || 0
            };
        });

        res.status(200).json(result);
    }
    catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                message: error.message
            });
        }

        next(error);
    }
}

async function getRewards(req, res, next) {
    try {
        const rewards = await db.Rewards.findAll();

        res.status(200).json(rewards);
    }
    catch (error) {
        next(error);
    }
}

async function createReward(req, res, next) {
    try {
        const { name, cost } = req.body || {};

        if (!name || cost === undefined || !Number.isInteger(Number(cost))) {
            return res.status(400).json({
                message: "Érvényes név és egész számú ár szükséges."
            });
        }

        const reward = await db.Rewards.create({
            name,
            cost: Number(cost)
        });

        res.status(201).json(reward);
    }
    catch (error) {
        next(error);
    }
}

// Jutalom beváltása ide kéne


module.exports = {
    getTasks,
    createTask,
    adjustPoints,
    getRewards,
    createReward
};
