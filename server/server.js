import http from "http";
import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";
import { chatSocketServer } from "./src/ws/chatSocket.js";

const server = http.createServer(app);

// Manejar upgrade de WS
server.on("upgrade", (req, socket, head) => {
  const urlParts = req.url.split("/");
  if (urlParts[1] === "ws" && urlParts[2] === "chat") {
    const chatId = urlParts[3];
    chatSocketServer.handleUpgrade(req, socket, head, (ws) => {
      chatSocketServer.emit("connection", ws, req, chatId);
    });
  } else {
    socket.destroy();
  }
});

// Conectar DB y levantar server
(async () => {
  try {
    await sequelize.sync();
    server.listen(4000, () => console.log("Server running on port 4000"));
  } catch (err) {
    console.error(err);
  }
})();
