import { Chat } from "../models/chat.js";
import { io } from '../server.js';
import { log } from "../utils/logger.js";
import { ChatClass } from "../containers/chatContainer.js";

const containerChat = new ChatClass(Chat);

export const saveChat = async(msg) => {
    try {
        msg = {...msg, date: Date.now()}
        const message = new Chat(msg);
        await containerChat.save(message);
        io.sockets.emit('receive_msg', message);

    } catch(err) {
        log.info(err)
    }
};
