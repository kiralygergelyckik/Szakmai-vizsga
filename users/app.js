const express = require("express");
const cookieParser = require("cookie-parser");

const { notFound, showError } = require("./api/middlewares/errorHandler");
const { userRoutes, taskRoutes } = require("./api/routes");

const app = express();
const api = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", api);

api.use("/users", userRoutes);
api.use("/tasks", taskRoutes);

app.use(notFound);
app.use(showError);

module.exports = {
    app,
    api,
};
