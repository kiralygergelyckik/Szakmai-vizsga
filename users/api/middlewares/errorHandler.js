const { NotFoundError, AppError } = require("../errors");

function notFound(req, res, next) {
    next(new NotFoundError());
}

function showError(error, req, res, next) {
    console.error("HIBA:", error);

    const stack = error.stack;

    if (!(error instanceof AppError)) {
        error = new AppError("Unexpected Server Occurred", {
            details: {
                message: error.message,
            },
        });
    }

    if (error.details && typeof error.details === "object") {
        delete error.details.message;
    }

    res.status(error.status || 500).json({
        message: error.message,
        ...error,
        stack,
    });
}

module.exports = {
    notFound,
    showError,
};
