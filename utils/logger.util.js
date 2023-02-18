const morgan = require('morgan');

const mogranLogger = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        'status:', tokens.status(req, res),
        'ContentLength:', tokens.res(req, res, 'content-length'), '|',
        'ResponseTime:', tokens['response-time'](req, res), 'ms', '|',
        tokens.date(req, res)
    ].join(' ')
});

module.exports = mogranLogger;