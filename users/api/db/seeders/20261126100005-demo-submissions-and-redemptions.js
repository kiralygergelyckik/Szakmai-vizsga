'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV !== "production") {
      await queryInterface.bulkInsert("submissions",
      [
        {
          ID: "3-3-3-3-1",
          isDone: true,
          userId: "3-3-43-8-3",
          taskId: "6-6-4-6-6",
        },
      ]);

      await queryInterface.bulkInsert("submission_answers",
      [
        {
          ID: "4-4-4-4-1",
          selectedAnswerId: "2-2-2-2-1",
          submissionId: "3-3-3-3-1",
          questionId: "1-1-1-1-1",
        },
        {
          ID: "4-4-4-4-2",
          selectedAnswerId: "2-2-2-2-3",
          submissionId: "3-3-3-3-1",
          questionId: "1-1-1-1-2",
        },
      ]);

      await queryInterface.bulkInsert("redemptions",
      [
        {
          ID: "5-5-5-5-1",
          redeemedAt: new Date(),
          userId: "3-3-43-8-3",
          rewardId: "7-7-4-8-7",
        },
      ]);
    }

    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("redemptions", null);
    await queryInterface.bulkDelete("submission_answers", null);
    await queryInterface.bulkDelete("submissions", null);
  }
};
