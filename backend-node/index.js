'use strict';
require('dotenv').config();
const express = require('express');
const { USER_TYPE } = require('./models/type');

require('./lib/db');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.json()); //Used to parse JSON bodies

app.get('/', (req, res) => {
  res.json('Hello World');
});

// CLIENT
app.use("/", function(req, res, next) {
  req.userType = USER_TYPE.CLIENT;
  next();
}, require("./routes/Security"));

app.use(
  "/orders",
  require("./middlewares/authentication"),
  require("./routes/Order")
);


// ESTABLISHMENT
app.use("/establishment", function (req, res, next) {
  req.userType = USER_TYPE.ESTABLISTMENT;
  next();
}, require("./routes/Security"));

app.use(
  "/establishment/menus",
  require("./middlewares/authentication"),
  require("./routes/Menu")
);

// app.use(
//   "/ingredients",
//   require("./middlewares/authentication"),
//   require("./routes/symfony/Ingredient")
// );

// ALL
app.use(
  "/users",
  require("./middlewares/authentication"),
  require("./routes/User")
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
