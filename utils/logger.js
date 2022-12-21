import logger from "pino";

export const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            messageKey: 'message'
        },
    },
    messageKey: 'message'
});
