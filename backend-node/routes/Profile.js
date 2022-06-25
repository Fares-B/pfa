const { authorization } = require("../middlewares");
const { USER_TYPE } = require("../models/type");

const Router = require("express").Router;
const router = new Router();

router.get("/", authorization({ userType: USER_TYPE.ESTABLISTMENT }), require("../controllers/symfony/Profile").get);


module.exports = router;
