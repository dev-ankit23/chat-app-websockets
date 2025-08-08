// import { WebSocketServer, WebSocket } from "ws";

// const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

// let userCount = 0;
// const allsockets: WebSocket[] = [];

// wss.on("connection", (socket) => {
//   allsockets.push(socket);
//   userCount++;
//   console.log("User is connected " + userCount);

//   socket.on("message", (message) => {
//     console.log(message.toString());
//     for (const s of allsockets) {
//       if (s) s.send(message.toString() + ": sent from the server");
//     }
//   });
// });

import express from "express";
import { WebSocketServer } from "ws";
const port = 8080;

const app = express();

const server = app.listen(port, () => {
  console.log("server is listening...");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    console.log("Message from client: ", data.toString());
    if (data) {
      ws.send("Message from Server", () => {
        console.log("Message from Server");
      });
    }
  });
});
