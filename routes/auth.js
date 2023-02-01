const { Router } = require('express');
const passport = require("passport");
const { registerUser, isLogged, onAuth, logout } = require("../controllers/auth.js");
const checkAuthentication = require("../middlewares/isAuthenticated.js")
const routerAuth = Router();

routerAuth.post('/register', passport.authenticate('signup'), registerUser);
routerAuth.post('/login', passport.authenticate('login'), isLogged);
routerAuth.get('/auth', checkAuthentication, onAuth);
routerAuth.delete('/logout', logout)

module.exports = routerAuth;

