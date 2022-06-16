'use strict';
require('dotenv').config();
const express = require('express');

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

app.use("/", require("./routes/Security"));

app.use(
  "/users",
  require("./middlewares/authentication"),
  require("./routes/User")
);

app.use(
  "/orders",
  require("./middlewares/authentication"),
  require("./routes/Order")
);

app.use(
  "/menus",
  require("./middlewares/authentication"),
  require("./routes/Menu")
);

app.use(
  "/ingredients",
  require("./middlewares/authentication"),
  require("./routes/symfony/Ingredient")
);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
