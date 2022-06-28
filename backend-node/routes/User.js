const Router = require("express").Router;
const UserController = require("../controllers/User");
const { authorization } = require("../middlewares");

const router = new Router();


router.get("/all", authorization({ role : 'admin' }), UserController.cget);

router.post("/", UserController.post);

router.get("/", UserController.get);

router.put("/", UserController.put);

router.delete("/:id", UserController.delete);


module.exports = router;
