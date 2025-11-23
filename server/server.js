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

let users = new Map();

wss.on('connection', (ws) => {
    const userId = `Usuario_${Math.floor(Math.random() * 1000)}`;
    users.set(ws, userId);

    ws.send(`Bienvenido ${userId}`);
    broadcast(`${userId} se ha unido al chat`);

    ws.on('message', (msg) => {
        broadcast(`${userId}: ${msg}`);
    });

    ws.on('close', () => {
        broadcast(`${userId} se ha desconectado`);
        users.delete(ws);
    });
});

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
