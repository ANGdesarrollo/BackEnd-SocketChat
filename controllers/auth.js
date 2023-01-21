import {log} from "../utils/logger.js";

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
        if (req.isAuthenticated()) {
        res.json({
            status: true,
            user: req.user.username
        })
        } else {
            res.json({
                status: false,
            })
        }

    } catch (err) {
        log.error(err);
    }
}

export const logout = (req, res) => {
    try {
        if(req.user) {
            req.session.destroy(err => {
                res.json({
                    status: false,
                    message: 'User log out failed'
                })
            })
        } else {
            res.json({
                status: true,
                message: 'User logged out successfully'
            })
        }

    }catch(err) {
        log.info(err);
    }
}
