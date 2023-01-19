import { Chat } from "../models/chat.js";
import { io } from '../server.js';
import { log } from "../utils/logger.js";
import { ChatClass } from "../containers/chatContainer.js";
import dayjs from 'dayjs';
import { emailValidator } from '../validators/emailValidator.js'

const containerChat = new ChatClass(Chat);
const dateNow = dayjs().format('YYYY/MM/DD')

export const saveChat = async(msg) => {
    try {
        const validationEmail = emailValidator(msg.user);
        if(validationEmail) {
            msg = {...msg, date: dateNow}
            const message = new Chat(msg);
            await containerChat.save(message);
            io.sockets.emit('receive_msg', message);
        }
    } catch(err) {
        log.info(err)
    }
};

export const getAllChats = async() => {
    try {
        return await containerChat.getChats();
    }catch(err) {
        log.error(err);
        throw new Error('Server error');
    }
}
