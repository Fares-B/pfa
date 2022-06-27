const { verifyToken } = require("../lib/jwt");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.sendStatus(401);
  } else {
    try {
      const [type, token] = auth.split(/\s+/);
      if (type !== "Bearer") throw new Error();
      const decoded = await verifyToken(token);
      req.user = decoded;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};
