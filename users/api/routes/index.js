const express = require("express");

const router = express.Router();

module.exports = {
    userRoutes: require("./userRoutes"),
    taskRoutes: require("./taskRoutes"),
};
