import {config} from "dotenv";
import express from 'express';
import {log} from './utils/logger.js';
import cors from 'cors';
import {Server} from "socket.io";
import http from 'http';
import {socketChat} from "./sockets/socket.js";
import passport from 'passport';
import {passportLocalRegister, passportLocalLogin} from "./passport/passport.js";
import User from "./models/user.js";
import {dbConnectionMongo, sessionMongo} from "./database/configDB.js";
import {routerAuth} from "./routes/auth.js";
import * as path from "path";

config();
await dbConnectionMongo();

const app = express();
const PORT = process.env.PORT || 8080;
const corsPolicy = process.env.corsOrigin;
const server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.use(cors({
    origin: corsPolicy,
    methods: [ "GET", "POST" ],
    credentials: true
}));
app.use(sessionMongo());
passport.serializeUser( ( user, done ) => done( null, user._id ) );
passport.deserializeUser( ( id, done ) => User.findById( id, done ) );
passport.use('signup', passportLocalRegister);
passport.use('login', passportLocalLogin);

app.use( passport.initialize() );
app.use( passport.session() );

server.listen(PORT, () => {
    log.info(`Server listening on http://localhost:${PORT}`);
});

export const io = new Server(server, {
    cors: {
        origin: corsPolicy,
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

socketChat(io);

app.use('/', routerAuth);
app.get('/', (req, res) => res.send('Server Online'));


























