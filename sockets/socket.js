import { log } from "../utils/logger.js";
import { getAllChats, saveChat } from "../controllers/sockets.js";

export const socketChat = (io) => {
    io.on('connection', async (socket) => {
        log.info(`User ${socket.id} is online`);
        socket.emit('allChats', await getAllChats());
        socket.on('send_msg', saveChat);
    });
}
