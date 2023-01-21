import {log} from "../utils/logger.js";

export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        log.error('entre al error del middleware')
        res.json({
            status: false
        })
    }
}