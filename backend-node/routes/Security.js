const { createToken } = require("../lib/jwt");
const bcrypt = require('bcrypt');
const Router = require("express").Router;
const UserController = require("../controllers/User");
const { UserModel } = require('../models');
const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email, userType: req.userType, deleted: false });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = createToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ username: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/register", UserController.post);

module.exports = router;
