const express = require("express");

const router = express.Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");

// nyem publik ig >__<
router.get("/", getUsers);

// nyem publik ig >__<
router.get("/:id", getUserById);

// nyem publik ig >__<

// nyem publik ig >__<
router.put("/:id", updateUser);

// nyem publik ig >__<
router.delete("/:id", deleteUser);

module.exports = router;