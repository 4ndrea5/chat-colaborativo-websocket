<<<<<<< HEAD
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

// Servidor HTTP que servirá los archivos estáticos del cliente
const server = http.createServer((req, res) => {
    let reqPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = path.join(__dirname, '..', 'client', reqPath);
    const ext = path.extname(filePath).toLowerCase();
    const mime = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg'
    };

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
        res.end(data);
    });
});

// Servidor WebSocket atado al servidor HTTP (mismo puerto)
const wss = new WebSocket.Server({ server });
=======
import http from "http";
import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";
import { chatSocketServer } from "./src/ws/chatSocket.js";
>>>>>>> 98eef0a3bffa5b6cd07935d13ebc11da40924be6

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

<<<<<<< HEAD
function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor HTTP y WebSocket corriendo en http://localhost:${PORT}`);
});
=======
// Conectar DB y levantar server
(async () => {
  try {
    await sequelize.sync();
    server.listen(4000, () => console.log("Server running on port 4000"));
  } catch (err) {
    console.error(err);
  }
})();
>>>>>>> 98eef0a3bffa5b6cd07935d13ebc11da40924be6
