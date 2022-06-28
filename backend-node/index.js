'use strict';
require('dotenv').config();
const express = require('express');
const { USER_TYPE } = require('./models/type');
const socketIO = require('socket.io');
const cors = require('cors');
require('./lib/db');

// Constants
const PORT = 5000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());
const http = require("http");

const server = http.createServer(app);

const io = socketIO(server, {
  // transports: ['websocket'],
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
});

io.on("disconnect", () => {
  console.log("Client disconnected");
});

module.exports = {io};



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
app.use(
  "/menus",
  require("./middlewares/authentication"),
  require("./routes/symfony/Menu")
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

app.use(
  "/establishment/qrcode/generate",
  require("./middlewares/qrcode"),
);

app.use(
  "/establishment/profile",
  require("./middlewares/authentication"),
  require("./routes/Profile")
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

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
