"use strict";

const http = require("http");
const os = require("os");
const path = require("path");

const five = require("johnny-five");
const Tessel = require("tessel-io");
const board = new five.Board({
  io: new Tessel()
});

const Express = require("express");
const SocketIO = require("socket.io");

const application = new Express();
const server = new http.Server(application);
const io = new SocketIO(server);

application.use(Express.static(path.join(__dirname, "app")));

board.on("ready", () => {
  const port = 3000;
  const rgb = new five.Led.RGB(["a5", "a6", "b5"]);

  io.on("connection", socket => {
    socket.on("select", color => {
      rgb.color(color);
    });
  });

  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});
