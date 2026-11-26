'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("submissions", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "users",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
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

    await queryInterface.createTable("submission_answers", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      selectedAnswerId: {
        type: Sequelize.STRING(64),
        allowNull: true,
        references: {
          model: "answer_options",
          key: "ID",
        },
        onDelete: "SET NULL",
        onUpdate: "RESTRICT",
      },
      submissionId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "submissions",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
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

    await queryInterface.createTable("rewards", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable("redemptions", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      redeemedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      userId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "users",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
      rewardId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "rewards",
          key: "ID",
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      },
    });

    await queryInterface.createTable("point_transactions", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      userId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "users",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("point_transactions");
    await queryInterface.dropTable("redemptions");
    await queryInterface.dropTable("rewards");
    await queryInterface.dropTable("submission_answers");
    await queryInterface.dropTable("submissions");
  },
};