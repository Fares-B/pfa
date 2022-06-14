// routes for orders
const Router = require("express").Router;
const OrderController = require("../controllers/Order");
const { authorization } = require("../middlewares");
const { OrderModel } = require("../models");

const router = new Router();


router.get("/", authorization({ role: 'admin', owner: true }), OrderController.cget);

router.post("/", OrderController.post);

router.get("/:id", OrderController.get);

router.put("/:id", authorization({ role: 'admin', owner: true }), OrderController.put);

router.delete("/:id", OrderController.delete);


module.exports = router;
