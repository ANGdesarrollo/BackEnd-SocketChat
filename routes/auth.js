import { Router } from "express";
import passport from "passport";
import { registerUser, isLogged } from "../controllers/auth.js";
export const routerAuth = Router();

routerAuth.post('/register', passport.authenticate('signup'), registerUser);
routerAuth.post('/login', passport.authenticate('login'), isLogged);


