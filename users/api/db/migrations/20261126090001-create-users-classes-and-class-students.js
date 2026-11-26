'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(60),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(120),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("student", "teacher", "admin"),
        defaultValue: "student",
        allowNull: false,
      },
      registeredAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.createTable("classes", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
      },
      teacherId: {
        type: Sequelize.STRING(64),
        allowNull: true,
        references: {
          model: "users",
          key: "ID",
        },
        onDelete: "SET NULL",
        onUpdate: "RESTRICT",
      },
    });

    await queryInterface.createTable("class_students", {
      ID: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        allowNull: false,
      },
      studentId: {
        type: Sequelize.STRING(64),
        allowNull: false,
        references: {
          model: "users",
          key: "ID",
        },
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("class_students");
    await queryInterface.dropTable("classes");
    await queryInterface.dropTable("users");
  },
};