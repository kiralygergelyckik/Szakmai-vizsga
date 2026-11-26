class TaskRepository
{
    constructor(model)
    {
        this.model = model;
    }

    async getTasks({ where = {} } = {})
    {
        try
        {
            return await this.model.findAll(
            {
                where,
                include:
                [
                    "class",
                    {
                        association: "questions",
                        include: [ "answerOptions" ],
                    },
                ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async getTaskById({ id })
    {
        try
        {
            return await this.model.findOne(
            {
                where: { ID: id },
                include:
                [
                    "class",
                    {
                        association: "questions",
                        include: [ "answerOptions" ],
                    },
                ],
            });
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async createTask({ taskInfo })
    {
        try
        {
            return await this.model.create(taskInfo);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async updateTask({ id, taskInfo })
    {
        try
        {
            const [ affectedCount ] = await this.model.update(taskInfo,
            {
                where: { ID: id },
            });

            if(affectedCount === 0) return { affectedCount, updated: null };

            const updated = await this.getTaskById({ id });

            return { affectedCount, updated };
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async deleteTask({ id })
    {
        const where = { ID: id };

        try
        {
            const deleted = await this.getTasks({ where });

            const affectedCount = await this.model.destroy(
            {
                where,
            });

            return {
                message: `${affectedCount} Task(s) deleted successfully`,
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

module.exports = TaskRepository;