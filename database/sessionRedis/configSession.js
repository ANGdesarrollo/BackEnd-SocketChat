import session from "express-session";
import connectRedis from 'connect-redis';
import { createClient } from 'redis';

import {log} from "../../utils/logger.js";
import MongoStore from "connect-mongo";

export const sessionRedis = () => {
    try {

        const redisClient = createClient({
            url: process.env.SESSION,
            legacyMode: true
        });
        redisClient.connect().catch(console.error);
        const RedisStore = connectRedis(session)
        const sessionCookies = session({
            store: new RedisStore({client: redisClient}),
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: true,
            rolling: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 48,
                sameSite: 'none',
                secure: true
            }
        })
        log.info('Redis session Online');
        return sessionCookies
    } catch (err) {
        log.error(err);
    }
}
