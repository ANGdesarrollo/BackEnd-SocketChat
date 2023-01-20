import { Router } from "express";
import passport from "passport";
import { registerUser, isLogged, onAuth, logout } from "../controllers/auth.js";
import {checkAuthentication} from "../middlewares/isAuthenticated.js";
export const routerAuth = Router();

routerAuth.post('/register', passport.authenticate('signup'), registerUser);
routerAuth.post('/login', passport.authenticate('login'), isLogged);
routerAuth.get('/auth', checkAuthentication, onAuth);
routerAuth.get('/logout', logout)

