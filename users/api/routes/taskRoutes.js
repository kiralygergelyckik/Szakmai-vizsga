const express = require("express");
const router = express.Router();

const {
    getTasks,
    createTask,
    adjustPoints,
    getRewards,
    createReward,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);


router.post("/:id/points", adjustPoints);

router.get("/rewards", getRewards);
router.post("/rewards", createReward);

module.exports = router;
