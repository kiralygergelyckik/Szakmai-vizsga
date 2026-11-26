'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      classId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "classes",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
    });

    await queryInterface.createTable("questions", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      taskId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "tasks",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
    });

    await queryInterface.createTable("answer_options", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      questionId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "questions",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("answer_options");
    await queryInterface.dropTable("questions");
    await queryInterface.dropTable("tasks");
  },
};