import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

let userCount = 0;
const allsockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allsockets.push(socket);
  userCount++;
  console.log("User is connected " + userCount);

  socket.on("message", (message) => {
    console.log("message received " + message.toString());
    for (const s of allsockets) {
      if (s) s.send(message.toString() + ": sent from the server");
    }
  });
});
