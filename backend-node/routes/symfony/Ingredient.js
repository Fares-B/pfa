// routes for ingredients
const Router = require("express").Router;
const IngredientController = require("../../controllers/symfony/Ingredient");

const router = new Router();


router.get("/", IngredientController.cget);

router.get("/:id", IngredientController.get);



module.exports = router;
