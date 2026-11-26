'use strict';

const { hashPassword } = require("../../utilities/userUtils");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    if (process.env.NODE_ENV !== "production") {
      await queryInterface.bulkInsert("users",
      [
        {
          ID: "1-1-4-8-1",
          first_name: "Admin",
          last_name: "Mester",
          username: "adminuser",
          email: "admin@example.com",
          password: hashPassword("admin123"),
          role: "admin",
        },
        {
          ID: "2-2-2-8-2",
          first_name: "Anna",
          last_name: "Nagy",
          username: "anna.tanar",
          email: "anna.tanar@example.com",
          password: hashPassword("teacher123"),
          role: "teacher",
        },
        {
          ID: "3-3-43-8-3",
          first_name: "Bence",
          last_name: "Kis",
          username: "bence.diak",
          email: "bence.diak@example.com",
          password: hashPassword("student123"),
          role: "student",
        },
      ]);
    }

    return;
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null);
  }
};