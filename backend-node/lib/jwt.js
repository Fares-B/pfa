const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
  const establishment = user.company ? { establishment: user.company.establishment } : {};

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    userType: user.userType,
    ...establishment,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

exports.verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};
