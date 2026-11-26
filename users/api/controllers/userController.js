function createUserController({ userService })
{
    async function getUsers(req, res, next)
    {
        try
        {
            res.status(200).json(await userService.getUsers());
        }
        catch (error)
        {
            next(error);
        }
    }

    async function getUser(req, res, next)
    {
        try
        {
            const { id } = req.params;
            res.status(200).json(await userService.getUserById({ id }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function createUser(req, res, next)
    {
        try
        {
            const { username, password, email, role, first_name, last_name } = req.body || {};

            const userInfo =
            {
                username,
                password,
                email,
                role,
                first_name,
                last_name,
            };

            res.status(201).json(await userService.createUser({ userInfo }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function updateUser(req, res, next)
    {
        try
        {
            const { id } = req.params;
            const { username, password, email, role, first_name, last_name } = req.body || {};

            res.status(200).json(await userService.updateUser(
            {
                id,
                userInfo:
                {
                    username,
                    password,
                    email,
                    role,
                    first_name,
                    last_name,
                },
            }));
        }
        catch (error)
        {
            next(error);
        }
    }

    async function deleteUser(req, res, next)
    {
        try
        {
            const { id } = req.params;
            res.status(200).json(await userService.deleteUser({ id }));
        }
        catch (error)
        {
            next(error);
        }
    }

    return {
        getUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser,
    };
}

module.exports = createUserController;