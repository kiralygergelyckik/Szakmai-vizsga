const express = require("express");
const cookieParser = require("cookie-parser");

const errorHandler = require("./api/middlewares/errorHandler");

const routes = require("./api/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", routes);

app.use(...errorHandler);

module.exports = app;
