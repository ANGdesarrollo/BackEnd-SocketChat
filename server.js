const log = require("./utils/logger");
const { Server } = require("socket.io");
const routerAuth = require("./routes/auth");
const sessionRedis = require("./database/sessionRedis/configSession")
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const { passportLocalRegister, passportLocalLogin } = require("./passport/passport.js")
const http = require("http");
const mongoConnection = require('./database/mongoDB/configDB');
const {ioSocket, socketChat} = require("./sockets/socket");

require('dotenv').config();
mongoConnection();

const app = express();
const PORT = process.env.PORT || 8080;
const corsPolicy = process.env.corsOrigin;
const server = http.createServer( app );

app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
app.enable( 'trust proxy', 1 )
app.use( cors( {
    origin: corsPolicy,
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true,
} ) );
app.use( sessionRedis() );
passport.serializeUser( ( user, done ) => done( null, user._id ) );
passport.deserializeUser( ( id, done ) => User.findById( id, done ) );
passport.use( 'signup', passportLocalRegister );
passport.use( 'login', passportLocalLogin );

app.use( passport.initialize() );
app.use( passport.session() );

server.listen( PORT, () => {
    log.info( `Server listening on http://localhost:${ PORT }` );
} );

const io = ioSocket(Server, server, corsPolicy);
socketChat(io)

app.use( '/', routerAuth );
app.get( '/', ( req, res ) => res.send( 'Server Online' ) );























