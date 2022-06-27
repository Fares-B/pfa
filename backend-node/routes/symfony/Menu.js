// routes for ingredients
const Router = require("express").Router;
const MenuController = require("../../controllers/symfony/Menu");

const router = new Router();


router.get("/:id", MenuController.cget);

router.get("/prices", MenuController.getPrices);


module.exports = router;
