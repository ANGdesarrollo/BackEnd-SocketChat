export const checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.json({
            status: false
        })
    }
}