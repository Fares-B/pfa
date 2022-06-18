// routes for orders
const Router = require("express").Router;
const MenuController = require("../controllers/Menu");
const { authorization } = require("../middlewares");
const { USER_TYPE } = require("../models/type");

const router = new Router();


router.get("/", authorization({ userType: USER_TYPE.ESTABLISTMENT }), MenuController.cget);

router.get("/history", authorization({ userType: USER_TYPE.ESTABLISTMENT }), MenuController.history);

router.put("/next-status/:id", authorization({ userType: USER_TYPE.ESTABLISTMENT }), MenuController.nextStatus);

router.delete("/cancel/:id", authorization({ userType: USER_TYPE.ESTABLISTMENT }), MenuController.delete);


module.exports = router;
