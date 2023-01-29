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
import {routerAuth} from "./routes/auth.js";
import {dbConnectionMongo, sessionRedis} from "./database/index.js";
import session from 'express-session';
import parseurl from 'parseurl'

config();
await dbConnectionMongo();

const app = express();
const PORT = process.env.PORT || 8080;
const corsPolicy = process.env.corsOrigin;
const server = http.createServer(app);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.enable('trust proxy', 1)
app.use(cors({
    origin: corsPolicy,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(sessionRedis());
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));
passport.use('signup', passportLocalRegister);
passport.use('login', passportLocalLogin);

app.use(passport.initialize());
app.use(passport.session());

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

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }

    // get the url pathname
    var pathname = parseurl(req).pathname

    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
    next()
})

app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})




























