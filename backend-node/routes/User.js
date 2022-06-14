const Router = require("express").Router;
const UserController = require("../controllers/User");
const { authorization } = require("../middlewares");

const router = new Router();


router.get("/", authorization({ role : 'admin' }), UserController.cget);

router.post("/", UserController.post);

router.get("/:id", UserController.get);

router.put("/:id", authorization({ role : 'admin' }), UserController.put);

router.delete("/:id", UserController.delete);


module.exports = router;
