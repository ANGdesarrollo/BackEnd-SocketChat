import { log } from "../utils/logger.js";

export const registerUser = ( req, res ) => {
    try {
        res.json( {
            status: true,
            message: 'User successfully registered'
        } );
    } catch ( err ) {
        log.error( err )
    }
}

export const isLogged = (req, res) => {
    try {
        res.json({
            status: true,
            message: 'User successfully logged in'
        })
    }catch(err) {
        log.error(err)
    }
}
