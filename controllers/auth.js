import {log} from "../utils/logger.js";
import passport from "passport";

export const registerUser = (req, res) => {
    try {
        res.json({
            status: true,
            message: 'User successfully registered'
        });
    } catch (err) {
        log.error(err)
    }
}

export const isLogged = (req, res) => {
    try {
        res.json({
            status: true,
            message: 'User successfully logged in'
        })
    } catch (err) {
        log.error(err)
    }
};

export const onAuth = (req, res) => {
    try {
        res.json({
            status: true,
            message: 'user is logged in',
            user: req.user.username
        });

    } catch (err) {
        log.error(err);
    }
}

export const logout = (req, res) => {
    try {
        if(req.user) {
            log.info(req.user)
            req.logout(err => {
                log.error(err)
            });
            res.json({
                status: true,
                message: 'User successfully logged out'
            })
        }

    }catch(err) {
        log.info(err);
    }
}
