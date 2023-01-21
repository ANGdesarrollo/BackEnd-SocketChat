import mongoose, { connect } from 'mongoose';
import { log } from '../utils/logger.js';
import MongoStore from "connect-mongo";
import session from "express-session";

mongoose.set( 'strictQuery', false );
export const dbConnectionMongo = async () => {
    try {
        await connect( process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        log.info( 'MongoAtlasDB online' )
    } catch ( err ) {
        log.info( err )
        throw new Error( 'Error to initialize MongoDB' );
    }
}

export const sessionMongo = () => {
    try {
        const sessionCookies = session( {
            store: MongoStore.create( {
                mongoUrl: process.env.DATABASE,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }
            } ),
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 2 * 24 * 60 * 60 * 1000
            }
        } )
        log.info( 'MongoDB session Online' );
        return sessionCookies
    } catch( err ) {
        log.error( err );
    }
}
