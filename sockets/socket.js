const log = require( '../utils/logger' );
const { getAllChats, saveChat } = require( "../controllers/sockets.js" );
const { Server } = require( "socket.io" );

const ioSocket = ( Server, server, corsPolicy ) => {
    return new Server( server, {
        cors: {
            origin: corsPolicy,
            methods: [ "GET", "POST" ],
            allowedHeaders: [ "my-custom-header" ],
            credentials: true
        }
    } );
}


const socketChat = ( io ) => {
    io.on( 'connection', async ( socket ) => {
        log.info( `User ${ socket.id } is online` );
        socket.emit( 'allMessages', await getAllChats() );
        socket.on( 'send_msg', ( data ) => saveChat( data, io ) );
    } );
}

module.exports = {
    ioSocket,
    socketChat
}
