function ErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    res.status(500).json({
        statusCode: 500,
        errorMessage: err.message,
        method: req.method,
        path: req.path
    });
}


module.exports = ErrorHandler;