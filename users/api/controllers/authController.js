const { UnauthorizedError, NotFoundError } = require("../errors");
const { checkPassword, generateToken, verifyToken, setCookie } = require("../utilities/authUtils");

function createAuthController({ userService })
{
    function getAuthStatus(req, res, next)
    {
        try
        {
            const { token } = req.cookies || {};

            if (!token) throw new UnauthorizedError("User is not logged in");

            const user = verifyToken(token);

            res.status(200).json(user);
        }
        catch (error)
        {
            next(error);
        }
    }

    async function login(req, res, next)
    {
        try
        {
            const { username, password } = req.body || {};

            const currentUser = await userService.getUserByUsername({ username });

            if (!currentUser) throw new NotFoundError("User not found");

            if (!checkPassword(password, currentUser.password))
            {
                throw new UnauthorizedError("Username or password is incorrect");
            }

            const safeUser =
            {
                ID: currentUser.ID,
                username: currentUser.username,
                email: currentUser.email,
                first_name: currentUser.first_name,
                last_name: currentUser.last_name,
                role: currentUser.role,
            };

            const token = generateToken(safeUser);

            setCookie({ data: token, key: "token" }, req, res, next);

            res.status(201).json(safeUser);
        }
        catch (error)
        {
            next(error);
        }
    }

    function logout(req, res, next)
    {
        try
        {
            res.clearCookie("token").sendStatus(204);
        }
        catch (error)
        {
            next(error);
        }
    }

    return {
        getAuthStatus,
        login,
        logout,
    };
}

module.exports = createAuthController;