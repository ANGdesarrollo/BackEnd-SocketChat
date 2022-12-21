import { config } from "dotenv";
import express from 'express';
import { log } from './utils/logger.js';
import cors from 'cors';
import {Server} from "socket.io";
import http from 'http';
import dbConnectionMongo from "./database/configDB.js";
import { saveChat } from "./controllers/sockets.js";
import { ChatClass } from "./containers/chatContainer.js";
import { Chat } from "./models/chat.js";

config({path: './environment/.env'});
await dbConnectionMongo();

const app = express();
const PORT = process.env.PORT;
const corsPolicy = process.env.corsOrigin;
const server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

server.listen(PORT, () => {
    log.info(`Server listening on http://localhost:${PORT}`);
});

export const io = new Server(server, {
    cors: {
        origin: corsPolicy,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

const containerChat = new ChatClass(Chat);
io.on('connection', async (socket) => {
    log.info(`User ${socket.id} is online`);
    const allChats = await containerChat.getChats();
    socket.emit('allChats', allChats);
    socket.on('send_msg', saveChat);
});

























