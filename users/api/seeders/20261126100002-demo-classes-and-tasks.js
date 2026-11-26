'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV !== "production") {
      await queryInterface.bulkInsert("classes",
      [
        {
          ID: "4-4-4-8-4",
          name: "10.A Osztály",
          code: "10A-2026",
          teacherId: "2-2-2-2-2",
        },
      ]);

      await queryInterface.bulkInsert("class_students",
      [
        {
          ID: "5-5-5-5-5",
          studentId: "3-3-3-3-3",
          classId: "4-4-4-8-4",
        },
      ]);

      await queryInterface.bulkInsert("tasks",
      [
        {
          ID: "6-6-4-6-6",
          name: "Matematikai haoi torony",
          description: "Extra bónuszfeladat a gyakorláshoz.",
          classId: "4-4-4-4-4",
        },
      ]);
    }

    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tasks", null);
    await queryInterface.bulkDelete("class_students", null);
    await queryInterface.bulkDelete("classes", null);
  }
};