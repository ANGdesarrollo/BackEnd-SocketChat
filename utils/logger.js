const logger = require('pino');

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            messageKey: 'message'
        },
    },
    messageKey: 'message'
});

module.exports = log;
