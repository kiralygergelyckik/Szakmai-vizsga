require("dotenv").config({ quiet: true });

const { app } = require("./app");

const PORT = process.env.PORT || 8080;
const { sequelize } = require("./api/db/index");


async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("Database connection established!");

        app.listen(PORT, () => {
            console.log(`Server started listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database error:", error);
    }
}

startServer();
