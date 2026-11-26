const express = require("express");

const router = express.Router();

const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.get("/:id", getTaskById);

// nyem publik ig >__<
router.post("/", createTask);

// nyem publik ig >__<
router.put("/:id", updateTask);

// nyem publik ig >__<
router.delete("/:id", deleteTask);

module.exports = router;
