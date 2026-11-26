module.exports = (sequelize) =>
{
    const Users = require("./User")(sequelize);
    const PointTransactions = require("./PointTransaction")(sequelize);
    const Rewards = require("./Reward")(sequelize);
    const Redemptions = require("./Redemption")(sequelize);
    const Tasks = require("./Task")(sequelize);
    const Questions = require("./Question")(sequelize);
    const AnswerOptions = require("./AnswerOption")(sequelize);
    const Submissions = require("./Submission")(sequelize);
    const SubmissionAnswers = require("./SubmissionAnswer")(sequelize);
    const Classes = require("./Class")(sequelize);
    const ClassStudents = require("./ClassStudent")(sequelize);

    Users.hasMany(PointTransactions,
    {
        foreignKey:
        {
            name: "userId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "pointTransactions",
    });

    PointTransactions.belongsTo(Users,
    {
        foreignKey: "userId",
        targetKey: "ID",

        as: "user",
    });


    Users.hasMany(Redemptions,
    {
        foreignKey:
        {
            name: "userId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "redemptions",
    });

    Redemptions.belongsTo(Users,
    {
        foreignKey: "userId",
        targetKey: "ID",

        as: "user",
    });


    Rewards.hasMany(Redemptions,
    {
        foreignKey:
        {
            name: "rewardId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",

        as: "redemptions",
    });

    Redemptions.belongsTo(Rewards,
    {
        foreignKey: "rewardId",
        targetKey: "ID",

        as: "reward",
    });



    //----- Task cuccosok



    Tasks.hasMany(Questions,
    {
        foreignKey:
        {
            name: "taskId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "questions",
    });

    Questions.belongsTo(Tasks,
    {
        foreignKey: "taskId",
        targetKey: "ID",

        as: "task",
    });

    Questions.hasMany(AnswerOptions,
    {
        foreignKey:
        {
            name: "questionId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "answerOptions",
    });

    AnswerOptions.belongsTo(Questions,
    {
        foreignKey: "questionId",
        targetKey: "ID",

        as: "question",
    });

    Users.hasMany(Submissions,
    {
        foreignKey:
        {
            name: "userId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "submissions",
    });

    Submissions.belongsTo(Users,
    {
        foreignKey: "userId",
        targetKey: "ID",

        as: "user",
    });

    Tasks.hasMany(Submissions,
    {
        foreignKey:
        {
            name: "taskId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "submissions",
    });

    Submissions.belongsTo(Tasks,
    {
        foreignKey: "taskId",
        targetKey: "ID",

        as: "task",
    });

    Submissions.hasMany(SubmissionAnswers,
    {
        foreignKey:
        {
            name: "submissionId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "answers",
    });

    SubmissionAnswers.belongsTo(Submissions,
    {
        foreignKey: "submissionId",
        targetKey: "ID",

        as: "submission",
    });

    Questions.hasMany(SubmissionAnswers,
    {
        foreignKey:
        {
            name: "questionId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "submissionAnswers",
    });

    SubmissionAnswers.belongsTo(Questions,
    {
        foreignKey: "questionId",
        targetKey: "ID",

        as: "question",
    });

    AnswerOptions.hasMany(SubmissionAnswers,
    {
        foreignKey:
        {
            name: "selectedAnswerId",
            allowNull: true,
        },

        sourceKey: "ID",

        onDelete: "SET NULL",
        onUpdate: "RESTRICT",

        as: "submissionAnswers",
    });

    SubmissionAnswers.belongsTo(AnswerOptions,
    {
        foreignKey: "selectedAnswerId",
        targetKey: "ID",

        as: "selectedAnswer",
    });



    //---- class cuccos




    Users.hasMany(Classes,
    {
        foreignKey:
        {
            name: "teacherId",
            allowNull: true,
        },

        sourceKey: "ID",

        onDelete: "SET NULL",
        onUpdate: "RESTRICT",

        as: "taughtClasses",
    });

    Classes.belongsTo(Users,
    {
        foreignKey: "teacherId",
        targetKey: "ID",

        as: "teacher",
    });

    Users.hasMany(ClassStudents,
    {
        foreignKey:
        {
            name: "studentId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "classMemberships",
    });

    ClassStudents.belongsTo(Users,
    {
        foreignKey: "studentId",
        targetKey: "ID",

        as: "student",
    });

    Classes.hasMany(ClassStudents,
    {
        foreignKey:
        {
            name: "classId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "studentMemberships",
    });

    ClassStudents.belongsTo(Classes,
    {
        foreignKey: "classId",
        targetKey: "ID",

        as: "class",
    });

    Classes.hasMany(Tasks,
    {
        foreignKey:
        {
            name: "classId",
            allowNull: false,
        },

        sourceKey: "ID",

        onDelete: "CASCADE",
        onUpdate: "RESTRICT",

        as: "tasks",
    });

    Tasks.belongsTo(Classes,
    {
        foreignKey: "classId",
        targetKey: "ID",

        as: "class",
    });

    return {
        Users,
        PointTransactions,
        Rewards,
        Redemptions,
        Tasks,
        Questions,
        AnswerOptions,
        Submissions,
        SubmissionAnswers,
        Classes,
        ClassStudents
    };
};