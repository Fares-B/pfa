// routes for orders
const Router = require("express").Router;
const MenuController = require("../controllers/Menu");
const { authorization } = require("../middlewares");

const router = new Router();


router.get("/", MenuController.cget);


module.exports = router;
