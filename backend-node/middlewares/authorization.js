// const mongoose = require("mongoose");

module.exports = (options = {}) => async (req, res, next) => {
    if (options.role) {
        if (req.user.role !== options.role) {
            return res.sendStatus(403)
        }
        // else {
        //     if(options.checkACL === false) {
        //         return next()
        //     }
        // }
    }
    // if it's client or establishment user
    if(options.userType) {
        if (req.user.userType !== options.userType) {
            return res.sendStatus(403)
        }
    }
    // if(options.owner) {
    //     // if user is not owner of the resource, return 403
    //     // but if user is admin, then allow access
    //     if (!options.role || options.role !== 'admin') {
    //         return res.sendStatus(403)
    //     }
    // }
    next();
}