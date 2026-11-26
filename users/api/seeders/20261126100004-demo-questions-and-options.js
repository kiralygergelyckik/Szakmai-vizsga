'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV !== "production") {
      await queryInterface.bulkInsert("questions",
      [
        {
          ID: "1-1-1-1-1",
          text: "Mennyi 6 * 7?",
          points: 10,
          taskId: "6-6-6-6-6",
        },
        {
          ID: "1-1-1-1-2",
          text: "Melyik szám prím?",
          points: 10,
          taskId: "6-6-6-6-6",
        },
      ]);

      await queryInterface.bulkInsert("answer_options",
      [
        {
          ID: "2-2-2-2-1",
          text: "42",
          isCorrect: true,
          questionId: "1-1-1-1-1",
        },
        {
          ID: "2-2-2-2-2",
          text: "36",
          isCorrect: false,
          questionId: "1-1-1-1-1",
        },
        {
          ID: "2-2-2-2-3",
          text: "13",
          isCorrect: true,
          questionId: "1-1-1-1-2",
        },
        {
          ID: "2-2-2-2-4",
          text: "9",
          isCorrect: false,
          questionId: "1-1-1-1-2",
        },
      ]);
    }

    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("answer_options", null);
    await queryInterface.bulkDelete("questions", null);
  }
};