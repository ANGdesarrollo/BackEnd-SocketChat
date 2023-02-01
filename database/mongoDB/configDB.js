const mongoose =  require("mongoose");
const {connect} =  require("mongoose");
const log =  require("../../utils/logger");

mongoose.set( 'strictQuery', false );
module.exports = dbConnectionMongo = async () => {
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




