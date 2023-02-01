const ChatClass =  require("../containers/chatContainer");
const dayjs =  require("dayjs");
const Chat =  require("../models/chat");
const log =  require("../utils/logger");
const emailValidator = require("../validators/emailValidator");


const containerChat = new ChatClass( Chat );
const dateNow = dayjs().format( 'YYYY/MM/DD' )

const saveChat = async ( msg, io ) => {
    try {
        const validationEmail = emailValidator( msg.username );
        if ( validationEmail ) {
            msg = { ...msg, date: dateNow }
            const message = new Chat( msg );
            console.log( msg )
            await containerChat.save( message );
            io.sockets.emit( 'receive_msg', message );
        }
    } catch ( err ) {
        log.info( err )
    }
};

const getAllChats = async () => {
    try {
        return await containerChat.getChats();
    } catch ( err ) {
        log.error( err );
        throw new Error( 'Server error' );
    }
}

module.exports = {
    getAllChats,
    saveChat
}
