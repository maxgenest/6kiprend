const express = require("express");
const path = require("path");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "svelte", "public", "index.html"));
});

const port = 8765;

app.listen(port, (error) => {
  if (error) {
    console.error("server cannot listen");
    return;
  }
  console.log(`server listening http://localhost:${port}`);
});

// websocket code

const WebSocket = require("ws");
const socketServer = new WebSocket.Server({ port: 3030 });

const messages = ["Start Chatting !"];

socketServer.on("connection", (socketClient) => {
  console.log("connected");

  socketClient.send(JSON.stringify(messages));

  socketClient.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();

    messages.push(message);

    socketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([message]));
      }
    });
  });

  socketClient.on("close", (socketClient) => {
    console.log("closed");
    console.log("Number of clients: ", socketServer.clients.size);
  });
});
