import { log } from "../utils/logger.js";
import passport from "passport";

export const registerUser = ( req, res ) => {
    try {
        res.json( {
            status: true,
            message: 'User successfully registered'
        } );
    } catch ( err ) {
        log.error( err )
        res.json( {
            status: false,
            message: "Server error"
        } )
    }
}

export const isLogged = ( req, res ) => {
    try {
        const { username } = req.body;
        res.json( {
            status: true,
            message: 'User successfully logged in',
            username
        } )
    } catch ( err ) {
        log.error( err )
        res.json( {
            status: false,
            message: "Server error"
        } )

    }
};

export const onAuth = ( req, res ) => {
    try {
        res.json( {
            status: true,
            message: 'user is logged in',
            username: req.user.username
        } );

    } catch ( err ) {
        log.error( err )
        res.json( {
            status: false,
            message: "Server error"
        } )
    }
}

export const logout = ( req, res, next ) => {
    try {
        req.logout( function ( err ) {
            if ( err ) {
                return res.json( {
                    status: false,
                    message: 'User logout failed'
                } )
            } else {
                return res.json( {
                    status: true,
                    username: null,
                    message: "User successfully logged out"
                } )
            }
        } );

    } catch ( err ) {
        log.error( err )
        res.json( {
            status: false,
            message: "Server error"
        } )
    }
}
