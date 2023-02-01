const log = require("../utils/logger");


module.exports =  checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        log.error('entre al error del middleware')
        res.json({
            status: false,
            message: 'User not authenticated'
        })
    }
}
