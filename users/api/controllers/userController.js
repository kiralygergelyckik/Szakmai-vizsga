
const db = require("../db");
const bcrypt = require("bcrypt");

async function getUsers(req, res, next) {
    try {
        const users = await db.Users.findAll({
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await db.Users.findByPk(id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(404).json({
                message: "Felhasználó nem található."
            });
        }

        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const {
            username,
            password,
            email,
            role,
            first_name,
            last_name
        } = req.body || {};

        if (!username || !password || !email || !first_name || !last_name) {
            return res.status(400).json({
                message: "Minden kötelező mezőt ki kell tölteni."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.Users.create({
            username,
            password: hashedPassword,
            email,
            role,
            first_name,
            last_name
        });

        const result = user.toJSON();
        delete result.password;

        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
}

// Felhasználó módosítása
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await db.Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Felhasználó nem található."
            });
        }

        const {
            username,
            password,
            email,
            role,
            first_name,
            last_name
        } = req.body || {};

        const userInfo = {
            username,
            email,
            role,
            first_name,
            last_name
        };

        Object.keys(userInfo).forEach(key => {
            if (userInfo[key] === undefined) {
                delete userInfo[key];
            }
        });

        if (password !== undefined && password !== "") {
            userInfo.password = await bcrypt.hash(password, 10);
        }

        await user.update(userInfo);

        const result = user.toJSON();
        delete result.password;

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await db.Users.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: "Felhasználó nem található."
            });
        }

        await user.destroy();

        res.status(200).json({
            message: "Felhasználó sikeresen törölve."
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
