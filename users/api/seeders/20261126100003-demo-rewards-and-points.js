'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV !== "production") {
      await queryInterface.bulkInsert("rewards",
      [
        {
          ID: "7-7-4-8-7",
          name: "Kisebb jutalom",
          cost: 50,
        },
        {
          ID: "8-8-4-8-8",
          name: "Közepes jutalom",
          cost: 100,
        },
      ]);

      await queryInterface.bulkInsert("point_transactions",
      [
        {
          ID: "9-9-49-7-9",
          amount: 20,
          timestamp: new Date(),
          userId: "3-3-4-8-3",
        },
      ]);
    }

    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("point_transactions", null);
    await queryInterface.bulkDelete("rewards", null);
  }
};