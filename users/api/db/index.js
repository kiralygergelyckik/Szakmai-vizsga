require("dotenv").config({ quiet: true });

const { Sequelize } = require("sequelize");

const env = process.env.NODE_ENV || "dev";
const config = require("./config/config")[env];

const sequelize = new Sequelize
(
    config.database,
    config.username,
    config.password,

    {
        host: config.host,
        dialect: config.dialect,

        logging: false,
    }
);

const models = require("../models")(sequelize);

module.exports =
{
    Sequelize,
    sequelize,
    ...models,
};
