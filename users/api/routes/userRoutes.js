const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// nyem publik ig >__<
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
// nyem publik ig >__<


module.exports = router;
