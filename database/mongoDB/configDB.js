import mongoose, { connect } from 'mongoose';
import { log } from '../../utils/logger.js';

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


